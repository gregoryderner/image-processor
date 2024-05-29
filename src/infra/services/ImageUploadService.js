const FormData = require('form-data');
const IHttpClient = require('../../core/ports/IHttpClient');

const apiUrl = process.env.API_UPLOAD_URL;

if (!apiUrl) {
  throw new Error("A variável API_UPLOAD_URL não foi fornecida");
}

/**
 * 
 * @param {IHttpClient} httpClient 
 */
async function uploadImages(httpClient, buffers, filenames, serviceType, bucket, acl) {
  try {
    const formData = new FormData();
    buffers.forEach((buffer, index) => {
      formData.append('files', buffer, filenames[index]);
    });
    formData.append('serviceType', serviceType);
    formData.append('filesName', JSON.stringify(filenames));
    formData.append('bucket', bucket);
    formData.append('acl', acl);

    const response = await httpClient.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.urls; // Retorna as URLs das imagens após o upload
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadImages };
