class Image {
  constructor(id, originalUrl, processedUrl, status) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.processedUrl = processedUrl;
    this.status = status;
  }
}

module.exports = Image;
