const { MongoClient } = require('mongodb');
const config = require('../../config');
const IDatabase = require('../../core/ports/IDatabase');

class MongoDB extends IDatabase {
  constructor() {
    super();
    this.uri = config.mongodb.uri;
    this.client = new MongoClient(this.uri);
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db();
      console.log('Conectado ao MongoDB');
    }
    return this.db;
  }

  async disconnect() {
    if (this.db) {
      await this.client.close();
      this.db = null;
      console.log('Desconectado do MongoDB');
    }
  }
}

// Singleton
let instance = null;

module.exports = function getMongoDBInstance() {
  if (!instance) {
    instance = new MongoDB();
  }
  return instance;
};
