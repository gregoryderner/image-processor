const IFixImageDimensions = require('../ports/IFixImageDimensions');

class FixImageDimensions extends IFixImageDimensions {
  constructor(imageRepository, imageService) {
    super();
    this.imageRepository = imageRepository;
    this.imageService = imageService;
  }

  async processImageForProductId(sellerId, productId, originalImages) {
    const uploadedImageUrls = await this.imageService.processImageDimensions(originalImages, sellerId);
    await this.imageRepository.updateProductImages(sellerId, productId, uploadedImageUrls);

    return uploadedImageUrls;
  }

  async processImageForSku(sellerId, sku, originalImages) {
    const uploadedImageUrls = await this.imageService.processImageDimensions(originalImages, sellerId);
    await this.imageRepository.updateProductImagesBySku(sellerId, sku, uploadedImageUrls);

    return uploadedImageUrls;
  }
}

module.exports = FixImageDimensions;
