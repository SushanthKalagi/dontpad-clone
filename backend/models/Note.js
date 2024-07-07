const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  url: String,
  content: String,
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
