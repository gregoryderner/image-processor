class IHttpClient {
  async get(url, options) {
    throw new Error('Method get not implemented');
  }

  async post(url, data, options) {
    throw new Error('Method post not implemented');
  }
}

module.exports = IHttpClient;
