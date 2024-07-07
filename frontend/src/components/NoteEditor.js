import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const NoteEditor = () => {
  const { url } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('join', url);

    socket.on('update', (newContent) => {
      setContent(newContent);
    });

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${url}`)
      .then((response) => {
        setContent(response.data.content);
      })
      .catch(() => {
        setContent('');
      });
  }, [url]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('edit', url, newContent);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${url}`, { content: newContent });
  };

  return (
    <div className="note-editor">
      <textarea value={content} onChange={handleChange} />
    </div>
  );
};

export default NoteEditor;
