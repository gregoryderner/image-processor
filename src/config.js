require('dotenv').config();

module.exports = {
  azureServiceBus: {
    connectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
    queueName: process.env.AZURE_SERVICE_BUS_QUEUE_NAME,
    enablePartitioning: true
  },
  mongodb: {
    uri: process.env.MONGODB_URI
  }
};
