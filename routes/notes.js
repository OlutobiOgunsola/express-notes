const util = require('util');
const express = require('express');
const multiparty = require('multiparty');

const notes = require('../models/notes-memory');

const router = express.Router();

// Add notes
router.get('/addNote', (req, res, next) => {
  console.log('Add note');
  res.render('noteedit', {
    title: 'Add Note',
    docreate: true,
    notekey: '',
    note: undefined,
  });
});

// Save notes
router.post('/savenote', async (req, res, next) => {
  let note;
  console.log(req.body.docreate);
  if (req.body.docreate) {
    console.log('create note');
    note = await notes.create(
      req.body.noteKey,
      req.body.noteTitle,
      req.body.noteBody,
    );
    console.log(`Note created ${req.body.noteKey}`);
  } else {
    console.log('Edit note');
    note = await notes.update(
      req.body.noteKey,
      req.body.noteTitle,
      req.body.noteBody,
    );
  }
});

// Read notes
router.get('/view', async (req, res, next) => {
  const note = await notes.read(req.query.key);
  res.render('noteview', {
    title: note ? note.title : '',
    notekey: req.query.key,
    note,
  });
});

router.get('/edit', async (req, res, next) => {
  const note = await notes.read(req.query.key);
  res.render('noteedit', {
    docreate: false,
    title: note ? `Edit ${note.title}` : `Add a note`,
    notekey: req.query.key,
    note,
  });
});

module.exports = router;
