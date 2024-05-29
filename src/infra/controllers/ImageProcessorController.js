const IMessageHandler = require('../../core/ports/IMessageHandler');

class ImageProcessorController {
  /**
   *
   * @param {IMessageHandler} messageHandler
   * @param {IQueueService} queueService
   * @param {Object} messageProcessingConfig
   */
  constructor(messageHandler, queueService, messageProcessingConfig) {
    this.messageHandler = messageHandler;
    this.queueService = queueService;
    this.messageProcessingConfig = messageProcessingConfig;
  }

  async startListening() {
    const args = process.argv.slice(2);
    const clearDLQ = args.indexOf('--clearDLQ');
    if (clearDLQ !== -1 && process.env.NODE_ENV === 'debug') {
      console.info("Clearing Dead Letter Queue in debug mode");
      await this.queueService.clearDeadLetterQueue();
      console.info("Dead Letter Queue cleared");
    }
    this.queueService.startListener(async (queueMessage) => {
      const messageBody = queueMessage.body;
      if (process.env.NODE_ENV === 'debug') {
        messageBody.debug = true;
        console.log("Running in debug mode, setting message debug flag to true");
      }
      console.log(`Starting to handle message:`, queueMessage.body);
      await this.messageHandler.handleQueueMessage(queueMessage);
      console.log(`Finished handling message:`, queueMessage.body);
    });
    console.log('Image processor listening for messages...');
  }
}

module.exports = ImageProcessorController;
