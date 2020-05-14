const notekey = Symbol('key');
const notebody = Symbol('body');
const notetitle = Symbol('title');

module.exports = class Note {
  /** Constructor
   *  @param {Object} key - note key
   *  @param {Object} body - note body
   *  @param {Object} title - note title
   *  @returns {Object} note - constructed object
   */
  constructor(key, body, title) {
    this[notekey] = key;
    this[notebody] = body;
    this[notetitle] = title;
  }

  /** Get key */
  get key() {
    return this[notekey];
  }

  /** Get title */
  get title() {
    return this[notetitle];
  }

  /** Set title
   * @param {String} newTitle - New title
   */
  set title(newTitle) {
    this[notetitle] = newTitle;
  }

  /** Get body */
  get body() {
    return this[notebody];
  }

  /** Set body
   * @param {String} newBody - New body
   */
  set body(newBody) {
    this[notebody] = newBody;
  }

  /** Static json getter
   * @param {Object} json -Json arg
   * @returns {Object} note
   */
  static fromJSON(json) {
    const data = JSON.parse(json);
    const note = new Note(data.key, data.title, data.body);
    return note;
  }
};
