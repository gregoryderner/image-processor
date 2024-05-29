class MessageHandler {
  #processImage;
  #queueService;
  #subjectHandlers;
  #fixImageDimensions;

  constructor(queueService, processImage, fixImageDimensions) {
    this.#processImage = processImage;
    this.#fixImageDimensions = fixImageDimensions;
    this.#queueService = queueService;
    this.#subjectHandlers = {
      'fixImageLinks': this.fixImageLinks.bind(this),
      'fixImagesDimensions': this.fixImagesDimensions.bind(this),
    };
  }

  async handleQueueMessage(queueMessage) {
    const { subject, body } = queueMessage;
    const partitionKey = body.sellerId;
    const isDebug = body.debug || false;

    try {
      const handler = this.#subjectHandlers[subject];
      if (handler) {
        console.log(`Handling message with subject: ${subject}`);
        await handler(body, partitionKey);
      } else {
        body.reason = `No handler for ${subject}`;
      }
    } catch (error) {
      if (!body.reason) {
        body.reason = error.message.includes('hasReason') ? error.message : `unknown Error: ${error.message}`;
      }
      await this.#queueService.deadLetterMessage(queueMessage);
    }
  }

  async fixImageLinks(queueBody) {
    const { sellerId, productId, sku, images = [] } = queueBody;
    try {
      if (productId) {
        return await this.#processImage.fixImageForProductId(sellerId, productId, images);
      }
      if (sku) {
        return await this.#processImage.processImageForSku(sellerId, sku, images);
      }
    } catch (error) {
      throw new Error(` hasReason: ${error.message}`);
    }
  }

  async fixImagesDimensions(queueBody) {
    const { sellerId, productId, sku, images = [] } = queueBody;
    try {
      if (productId) {
        return await this.#fixImageDimensions.processImageForProductId(sellerId, productId, images);
      }
      if (sku) {
        return await this.#fixImageDimensions.processImageForSku(sellerId, sku, images);
      }
    } catch (error) {
      console.log(error)
      throw new Error(` hasReason: ${error.message}`);
    }
  }
}

module.exports = MessageHandler;
