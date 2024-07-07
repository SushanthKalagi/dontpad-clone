const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const Note = require('./models/Note');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/notes', noteRoutes);

io.on('connection', (socket) => {
  socket.on('join', (url) => {
    socket.join(url);
  });

  socket.on('edit', (url, content) => {
    socket.to(url).emit('update', content);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

