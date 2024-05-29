const IImageProcessor = require('../../core/ports/IImageProcessor');
const IImageDownloader = require('../../core/ports/IImageDownloader');
const { uploadImages } = require('./ImageUploadService');
const IImageDimensionsProcessor = require('../../core/ports/IImageDimensionsProcessor');

class ImageService {
  /**
   * 
   * @param {IImageProcessor} imageProcessor 
   * @param {IImageDownloader} imageDownloader 
   * @param {IHttpClient} httpClient 
   * @param {IImageDimensionsProcessor} imageDimensionsProcessor 
   */
  constructor(imageProcessor, imageDownloader, httpClient, imageDimensionsProcessor) {
    this.imageProcessor = imageProcessor;
    this.imageDownloader = imageDownloader;
    this.httpClient = httpClient;
    this.imageDimensionsProcessor = imageDimensionsProcessor;
  }

  async processImages(listOfImagesUrl, sellerId, processFn) {
    const processedImages = [];
    const buffers = [];

    for (const url of listOfImagesUrl) {
      try {
        const buffer = await this.imageDownloader.downloadImage(url);
        const processedBuffer = await processFn(buffer);
        processedImages.push(processedBuffer);
        buffers.push(processedBuffer);
      } catch (error) {
        console.error(`Error processing image at URL ${url}: ${error.message}`);
        processedImages.push(null);
      }
    }

    while (processedImages.length < listOfImagesUrl.length) {
      processedImages.push(null);
    }

    const now = new Date().getTime()

    const filenames = imagesWithExtension.map((image, index) => `image_${index}.${image.extension}`);
    const bucket = `growhubstorage/${now}/${sellerId}`;
    const acl = 'public-read';
    const serviceType = 's3';

    const urls = await uploadImages(this.httpClient, buffers, filenames, serviceType, bucket, acl);
    return urls;
  }

  async processImageExtensions(listOfImagesUrl, sellerId) {
    const processFn = async (buffer) => {
      const extension = await this.imageProcessor.processImage(buffer);
      return { buffer, extension };
    };

    return this.processImages(listOfImagesUrl, sellerId, processFn);
  }

  async processImageDimensions(listOfImagesUrl, sellerId) {
    const processFn = async (buffer) => {
      const resizedBuffer = await this.imageDimensionsProcessor.adjustDimensions(buffer);
      return resizedBuffer;
    };

    return this.processImages(listOfImagesUrl, sellerId, processFn);
  }
}

module.exports = ImageService;
