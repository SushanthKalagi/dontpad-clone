const Note = require('../models/Note');

const getNote = async (req, res) => {
  const { url } = req.params;
  const note = await Note.findOne({ url });
  if (note) {
    res.json(note);
  } else {
    res.status(404).send('Note not found');
  }
};

const saveNote = async (req, res) => {
  const { url } = req.params;
  const { content } = req.body;
  let note = await Note.findOne({ url });
  if (note) {
    note.content = content;
  } else {
    note = new Note({
      url,
      content,
    });
  }
  await note.save();
  res.status(200).send('Note saved');
};

module.exports = { getNote, saveNote };
