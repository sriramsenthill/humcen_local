const fs = require('fs');
const winston = require('winston');
const triple = require('triple-beam');
const DailyRotateFile = require('winston-daily-rotate-file');

const logDirectory = `${__dirname}/../log`;
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

function formatObject(param) {
  if (typeof param === 'string') {
    return param;
  }

  if (param instanceof Error) {
    return param.stack ? param.stack : JSON.stringify(param, null, 2);
  }

  return process.env.NODE_ENV !== 'production' ? JSON.stringify(param, null, 2) : JSON.stringify(param);
}

const logFormat = winston.format.printf((info) => {
  const { timestamp, level, message } = info;
  const rest = info[triple.SPLAT] || [];
  let result = `${timestamp} - ${level}: ${info.stack ? formatObject(info.stack) : formatObject(message)}`;

  if (rest.length) {
    result += ` ${rest.map(formatObject).join(' ')}`;
  }

  return result;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY/MM/DD HH:mm:ss:SSSS',
    }),
    logFormat,
  ),
  transports: [
    new DailyRotateFile({
      filename: `${logDirectory}/server_%DATE%`,
      datePattern: 'YYYY',
      extension: '.log',
      maxSize: '5m', // If using the units,add 'k', 'm', or 'g' as the suffix.
      maxFiles: 5,
      auditFile: `${logDirectory}/winston_audit.json`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

module.exports = logger;
