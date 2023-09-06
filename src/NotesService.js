const { Pool } = require("pg");

/**
 * NotesService is a class that handles notes related database operations.
 */
class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  /**
   * getNotes returns all notes that belong to a user and can be collaborated.
   */
  async getNotes(userId) {
    const query = {
      text: `SELECT notes.* FROM notes
      LEFT JOIN collaborations ON collaborations.note_id = notes.id
      WHERE notes.owner = $1 OR collaborations.user_id = $1
      GROUP BY notes.id`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = NotesService;
