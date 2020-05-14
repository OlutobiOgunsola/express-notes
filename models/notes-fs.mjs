import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import Note from './note';
import DBG from 'debug';

const debug = DBG('notes:notes-fs');
const error = DBG('notes:error-fs');

/** notesDir */

// eslint-disable-next-line require-jsdoc
async function notesDir() {
  const dir = process.env.NOTES_FS_DIR || 'notes-fs-data';
  await fs.ensureDir(dir);
  return dir;
}

// eslint-disable-next-line require-jsdoc
function filePath(notesdir, key) {
  return path.join(notesdir, `${key}.json`);
}

// eslint-disable-next-line require-jsdoc
async function readJSON(notesdir, key) {
  const readFrom = filePath(notesdir, key);
  const data = await fs.readFile(readFrom, 'utf8');
  return Note.fromJSON(data);
}

// eslint-disable-next-line require-jsdoc
async function crupdate(key, title, body) {
  const note = new Note(key, title, body);
  const notesdir = await notesDir();
  if (key.indexOf('/') >= 0) throw new Error(`key ${key} cannot contain '/'`);
  const writeTo = filePath(notesdir, key);
  const writeJSON = note.JSON;
  await fs.writeFile(writeTo, writeJSON, 'utf8');
  return note;
}
// eslint-disable-next-line require-jsdoc
export function create(key, title, body) {
  return crupdate(key, title, body);
}
// eslint-disable-next-line require-jsdoc
export function update(key, title, body) {
  return crupdate(key, title, body);
}

// eslint-disable-next-line require-jsdoc
export async function read(key) {
  const notesdir = await notesDir();
  const thenote = await readJSON(notesdir, key);
  return thenote;
}

// eslint-disable-next-line require-jsdoc
export async function destroy(key) {
  const notesdir = await notesDir();
  await fs.unlink(filePath(notesdir, key));
}

// eslint-disable-next-line require-jsdoc
export async function keylist() {
  const notesdir = await notesDir();
  let filez = await fs.readdir(notesdir);
  if (!filez || typeof filez === 'undefined') filez = [];
  const thenotes = filez.map(async frame => {
    const key = path.basenamt(fname, '.json');
    const thenote = await readJSON(notesdir, key);
    return thenote.key;
  });
  return Promise.all(thenotes);
}

// eslint-disable-next-line require-jsdoc
export async function count() {
  const notesdir = await notesDir();
  const filez = await fs.readdir(notesdir);
  return filez.length;
}

// eslint-disable-next-line require-jsdoc
export async function close() {
  return null;
}
