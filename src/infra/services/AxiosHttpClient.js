const axios = require('axios');
const IHttpClient = require('../../core/ports/IHttpClient');

class AxiosHttpClient extends IHttpClient {
  async get(url, options) {
    return await axios.get(url, options);
  }

  async post(url, data, options) {
    return await axios.post(url, data, options);
  }
}

module.exports = AxiosHttpClient;