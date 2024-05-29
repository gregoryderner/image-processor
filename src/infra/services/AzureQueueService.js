const IQueueService = require("../../core/ports/IQueueService");
const IServiceBusConnection = require("../../core/ports/IServiceBusConnection");

class AzureQueueService extends IQueueService {
  /**
   * 
   * @param {IServiceBusConnection} serviceBusConnection 
   * @param {Object} config 
   */
  constructor(serviceBusConnection, config) {
    super();
    this.connection = serviceBusConnection;
    this.config = config;
    this.receiver = this.connection.createReceiver(this.config.queueName);
    this.defaultLockTimeMls = 300000; // 5 minutes
  }

  async startListener(callback) {
    this.receiver.subscribe({
      processMessage: async (message) => {
        await callback(message);
      },
      processError: async (args) => {
        console.error("Error occurred while receiving message", args.error);
      },
    });
  }

  async completeMessage(message) {
    await this.receiver.completeMessage(message);
  }

  async abandonMessage(message) {
    await this.receiver.abandonMessage(message);
  }

  async deferMessage(message, options = {}) {
    const lockDuration = options.lockDuration || this.defaultLockTimeMls;
    await this.receiver.deferMessage(message, { lockDuration });
  }

  async deadLetterMessage(message) {
    await this.receiver.deadLetterMessage(message);
  }

  async clearDeadLetterQueue() {
    const deadLetterQueueName = `${this.config.queueName}/$DeadLetterQueue`;
    const deadLetterReceiver = this.connection.createReceiver(deadLetterQueueName);

    let messages = await deadLetterReceiver.receiveMessages(100, { maxWaitTimeInMs: 1000 });

    while (messages.length > 0) {
      for (const message of messages) {
        await deadLetterReceiver.completeMessage(message);
      }
      messages = await deadLetterReceiver.receiveMessages(100, { maxWaitTimeInMs: 1000 });
    }

    console.log("Dead Letter Queue cleared");
  }
}

module.exports = AzureQueueService;
