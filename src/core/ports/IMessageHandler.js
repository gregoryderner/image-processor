class IMessageHandler {
  async handleQueueMessage(queueMessage) {
    throw new Error('Method handleQueueMessage not implemented');
  }
}

module.exports = IMessageHandler;
