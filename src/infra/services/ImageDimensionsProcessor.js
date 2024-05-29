const sharp = require('sharp');
const IImageDimensionsProcessor = require('../../core/ports/IImageDimensionsProcessor');

class ImageDimensionsProcessor extends IImageDimensionsProcessor {
  /**
   *
   * @param {Buffer} buffer
   * @returns {Promise<Buffer>}
   */
  async adjustDimensions(buffer) {
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();

      if (metadata.width < 500 || metadata.height < 500) {
        const resizedImage = await image.resize(500, 500, {
          fit: sharp.fit.cover,
        }).toBuffer();
        return resizedImage;
      }

      return buffer;
    } catch (error) {
      console.error(`Erro ao redimensionar a imagem: ${error.message}`);
      return buffer;
    }
  }
}

module.exports = ImageDimensionsProcessor;