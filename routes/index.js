const express = require('express');
const notes = require('../models/notes-memory');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const keylist = await notes.keylist();
  const keyPromises = keylist.map(key => {
    return notes.read(key);
  });
  const notelist = await Promise.all(keyPromises);
  res.render('index', { title: 'nOtEs', notelist });
});

module.exports = router;
