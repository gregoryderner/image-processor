class IFixImageDimensions {
  async processImageForProductId(sellerId, productId, originalImages) {
    throw new Error('Method processImageForProductId not implemented');
  }

  async processImageForSku(sellerId, sku, originalImages) {
    throw new Error('Method processImageForSku not implemented');
  }
}

module.exports = IFixImageDimensions;
