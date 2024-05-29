const { ObjectId } = require('mongodb');
const IImageRepository = require('../../core/ports/IImageRepository');

class ImageRepository extends IImageRepository {
  constructor(database) {
    super();
    this.database = database;
    this.collection = 'sku';
  }

  async getImagesByProductId(sellerId, productId) {
    try {
      const db = await this.database.connect();
      const sellerObjectId = new ObjectId(sellerId);
      const productObjectId = new ObjectId(productId);
      const query = { sellerId: sellerObjectId, _id: productObjectId };
      const product = await db.collection(this.collection).findOne(query);
      return product && product.image ? product.image : [];
    } catch (error) {
      throw error;
    }
  }

  async updateProductImages(sellerId, productId, images) {
    try {
      const db = await this.database.connect();
      const sellerObjectId = new ObjectId(sellerId);
      const productObjectId = new ObjectId(productId);

      await db.collection(this.collection).updateOne(
        { sellerId: sellerObjectId, _id: productObjectId },
        { $set: { image: images } }
      );

      console.log('Product images updated successfully');
    } catch (error) {
      throw error;
    }
  }

  async getImagesBySku(sellerId, sku) {
    try {
      const db = await this.database.connect();
      const sellerObjectId = new ObjectId(sellerId);      
      const query = { sellerId: sellerObjectId, sku: sku };
      const product = await db.collection(this.collection).findOne(query);

      return product && product.image ? product.image : [];
    } catch (error) {
      throw error;
    }
  }

  async updateProductImagesBySku(sellerId, sku, images) {
    try {
      const db = await this.database.connect();
      const sellerObjectId = new ObjectId(sellerId);

      await db.collection(this.collection).updateOne(
        { sellerId: sellerObjectId, sku },
        { $set: { image: images } }
      );

      console.log('Product images updated successfully');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImageRepository;
