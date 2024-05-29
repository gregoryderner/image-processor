require('dotenv').config();

const config = require('./config');
const ImageRepository = require('./infra/repositories/ImageRepository');
const AzureQueueService = require('./infra/services/AzureQueueService');
const AzureServiceBusConnection = require('./infra/services/AzureServiceBusConnection');
const ImageProcessorController = require('./infra/controllers/ImageProcessorController');
const MessageHandler = require('./infra/controllers/MessageHandler');
const ProcessImage = require('./core/usecases/ProcessImage');
const FixImageExtension = require('./core/usecases/FixImageExtension');
const FixImageDimensions = require('./core/usecases/FixImageDimensions');
const getMongoDBInstance = require('./infra/database/MongoDB');
const MessageProcessingConfig = require('./core/usecases/MessageProcessingConfig');
const AxiosHttpClient = require('./infra/services/AxiosHttpClient');
const ImageDownloader = require('./infra/services/ImageDownloader');
const ImageService = require('./infra/services/ImageService');
const AzureServiceBusClient = require('./infra/services/AzureServiceBusClient');
const FileTypeAdapter = require('./infra/services/FileTypeAdapter');
const ImageProcessor = require('./infra/services/ImageProcessor');
const ImageDimensionsProcessor = require('./infra/services/ImageDimensionsProcessor');

const mongoDB = getMongoDBInstance();

(async () => {
  const imageRepository = new ImageRepository(mongoDB);
  const fileType = new FileTypeAdapter();
  const imageProcessor = new ImageProcessor(fileType);
  const imageDimensionsProcessor = new ImageDimensionsProcessor();
  const httpClient = new AxiosHttpClient();
  const imageDownloader = new ImageDownloader(httpClient);
  const imageService = new ImageService(imageProcessor, imageDownloader, httpClient, imageDimensionsProcessor);

  const fixImageExtension = new FixImageExtension(imageRepository, imageService);
  const processImage = new ProcessImage(fixImageExtension);
  const fixImageDimensions = new FixImageDimensions(imageRepository, imageService);

  const serviceBusClient = new AzureServiceBusClient(config.azureServiceBus.connectionString);
  const serviceBusConnection = new AzureServiceBusConnection(serviceBusClient);
  const queueService = new AzureQueueService(serviceBusConnection, config.azureServiceBus);

  const messageProcessingConfig = new MessageProcessingConfig();
  const messageHandler = new MessageHandler(queueService, processImage, fixImageDimensions);
  const imageProcessorController = new ImageProcessorController(messageHandler, queueService, messageProcessingConfig);

  imageProcessorController.startListening();
})();
