class MessageProcessingConfig {
  constructor() {
    this.defaultLockMls = 300000; // 5 minutos
    this.oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 horas
  }

  getDefaultLockDuration() {
    return this.defaultLockMls;
  }

  getOneDayLockDuration() {
    return this.oneDayInMilliseconds;
  }
}

module.exports = MessageProcessingConfig;
