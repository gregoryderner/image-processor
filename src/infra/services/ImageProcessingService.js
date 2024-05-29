class ImageProcessingService {
  #processImage;

  constructor(processImage) {
    this.#processImage = processImage;
  }

  async processFixImageExtension(sellerId, productId) {
    return await this.#processImage.fixImageExtension(sellerId, productId);
  }
}

module.exports = ImageProcessingService;
