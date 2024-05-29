const IFileType = require('../../core/ports/IFileType');

class FileTypeAdapter extends IFileType {
  async fromBuffer(buffer) {
    const { fileTypeFromBuffer } = await import('file-type');
    return await fileTypeFromBuffer(buffer);
  }
}

module.exports = FileTypeAdapter;
