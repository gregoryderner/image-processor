class IDatabase {
  async connect() {
    throw new Error('Method connect not implemented');
  }

  async disconnect() {
    throw new Error('Method disconnect not implemented');
  }
}

module.exports = IDatabase;
