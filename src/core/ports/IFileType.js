class IFileType {
  async fromBuffer(buffer) {
    throw new Error('Method fromBuffer not implemented');
  }
}

module.exports = IFileType;
