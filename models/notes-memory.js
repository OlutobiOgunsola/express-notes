const Note = require('./note');

let notes = [];

exports.create = async function create(key, title, body) {
  notes[key] = new Note(key, title, body);
  return notes[key];
};

exports.update = exports.create;

exports.read = async function read(key) {
  if (notes[key]) return notes[key];
  throw new Error(`Note ${key} does not exist`);
};

exports.destroy = async function destroy(key) {
  if (notes[key]) {
    delete notes[key];
  }
  throw new Error(`Note ${key} does not exist`);
};

exports.keylist = async function keylist() {
  return Object.keys(notes);
};

exports.count = async function count() {
  return notes.length();
};

exports.close = async function close() {
  return null;
};
