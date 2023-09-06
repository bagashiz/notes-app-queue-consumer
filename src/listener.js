/**
 * Listener is a class that will be used to consume messages from the queue.
 */
class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  /**
   * listen is a method that will be used to consume messages from the queue.
   */
  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(notes)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
