const IHttpClient = require('../../core/ports/IHttpClient');

class ImageDownloader {
  /**
   *
   * @param {IHttpClient} httpClient
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async downloadImage(url) {
    const response = await this.httpClient.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  }
}

module.exports = ImageDownloader;