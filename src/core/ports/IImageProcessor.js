class IImageProcessor {
  async processImage(buffer) {
    throw new Error('Method processImage not implemented');
  }
}

module.exports = IImageProcessor;
