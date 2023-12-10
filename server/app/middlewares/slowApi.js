const winston = require('winston');
const onFinished = require('on-finished');

const logger = require('../logger');

const logDirectory = `${__dirname}/../log`;
const slowApiLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: logDirectory + 'slow-api.log' }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  slowApiLogger.add(new winston.transports.Console());
}

const detect = (req, res, next) => {
  const start = Date.now();

  onFinished(res, function (err) {
    if (!err.isLogged) {
      err.isLogged = true;
      logger.error(req, 'Error-handling middleware', err);
    }

    const duration = Date.now() - start;
    if (duration > 1000) {
      slowApiLogger.warn(`${req.method} ${req.url} - ${duration}ms`);
    }
  });
  next();
};

module.exports = detect;