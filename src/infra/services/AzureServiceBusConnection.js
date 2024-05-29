const IServiceBusConnection = require("../../core/ports/IServiceBusConnection");
const IServiceBusClient = require("../../core/ports/IServiceBusClient");

class AzureServiceBusConnection extends IServiceBusConnection {
  /**
   *
   * @param {IServiceBusClient} serviceBusClient
   */
  constructor(serviceBusClient) {
    super();
    this.serviceBusClient = serviceBusClient;
  }

  createReceiver(queueName) {
    return this.serviceBusClient.createReceiver(queueName);
  }

  createSender(queueName) {
    return this.serviceBusClient.createSender(queueName);
  }
}

module.exports = AzureServiceBusConnection;
