const { ServiceBusClient } = require("@azure/service-bus");
const IServiceBusClient = require("../../core/ports/IServiceBusClient");

class AzureServiceBusClient extends IServiceBusClient {
  constructor(connectionString) {
    super();
    this.sbClient = new ServiceBusClient(connectionString);
  }

  createReceiver(queueName) {
    return this.sbClient.createReceiver(queueName);
  }

  createSender(queueName) {
    return this.sbClient.createSender(queueName);
  }
}

module.exports = AzureServiceBusClient;
