class IQueueService {
  startListener(callback) {
    throw new Error('Método startListener não implementado');
  }

  async completeMessage(message){
    throw new Error('Método completeMessage não implementado');
  }

  async abandonMessage(message){
    throw new Error('Método abandonMessage não implementado');
  }

  async deferMessage(message, lockTime){
    throw new Error('Método deferMessage não implementado');
  }

  sendMessage(message) {
    throw new Error('Método sendMessage não implementado');
  }
}

module.exports = IQueueService;
