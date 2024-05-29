const IFixImageExtension = require('../ports/IFixImageExtension');

class FixImageExtension extends IFixImageExtension {
  constructor(imageRepository, imageService) {
    super();
    this.imageRepository = imageRepository;
    this.imageService = imageService;
  }

  async processImageForProductId(sellerId, productId, originalImages) {
    const listOfImagesUrl = originalImages.map(urls => urls.link)
    const uploadedImageUrls = await this.imageService.processImageExtensions(listOfImagesUrl, sellerId);

    await this.imageRepository.updateProductImages(sellerId, productId, uploadedImageUrls);

    return uploadedImageUrls;
  }

  async processImageForSku(sellerId, sku, originalImages) {
    const listOfImagesUrl = originalImages.map(urls => urls.link)
    const uploadedImageUrls = await this.imageService.processImageExtensions(listOfImagesUrl, sellerId);
    await this.imageRepository.updateProductImagesBySku(sellerId, sku, uploadedImageUrls);

    return uploadedImageUrls;
  }
}

module.exports = FixImageExtension;
