const express = require('express');
const { getNote, saveNote } = require('../controllers/noteController');

const router = express.Router();

router.get('/:url', getNote);
router.post('/:url', saveNote);

module.exports = router;
