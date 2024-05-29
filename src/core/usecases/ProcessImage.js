const IFixImageExtension = require('../ports/IFixImageExtension');

class ProcessImage extends IFixImageExtension {
  /**
   *
   * @param {IFixImageExtension} fixImageExtension
   */
  constructor(fixImageExtension) {
    super();
    this.fixImageExtensionService = fixImageExtension;
  }

  async fixImageForProductId(sellerId, productId, images) {
    return await this.fixImageExtensionService.processImageForProductId(sellerId, productId, images);
  }

  async processImageForSku(sellerId, sku, images) {
    return await this.fixImageExtensionService.processImageForSku(sellerId, sku, images);
  }
}

module.exports = ProcessImage;
