const IFileType = require('../../core/ports/IFileType');

class ImageProcessor {
  /**
   *
   * @param {IFileType} fileType
   */
  constructor(fileType) {
    this.fileType = fileType;
  }

  async processImage(buffer) {
    const result = await this.fileType.fromBuffer(buffer);
    return result ? result.ext : undefined;
  }
}

module.exports = ImageProcessor;
