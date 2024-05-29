class IServiceBusConnection {
  createReceiver(queueName) {
    throw new Error('Method createReceiver not implemented');
  }

  createSender(queueName) {
    throw new Error('Method createSender not implemented');
  }
}

module.exports = IServiceBusConnection;
