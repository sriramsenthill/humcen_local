const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");
const logger = require('./app/logger');
const router = require("./app/routes/routes");
const withoutAuth = require("./app/routes/withoutAuth");
const partnerRouter = require("./app/routes/partnerRoutes");

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
db.init();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
  app.use((req, res, next) => {
    logger.debug(req, 'Incoming request');
    next();
  });
}

// routes
app.use(router);
app.use('/api/partner', partnerRouter);
app.use('/api/noauth', withoutAuth);

// Error-handling middleware
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, _next) {
  if (!err.isLogged) {
    err.isLogged = true;
    logger.error(req, 'Error-handling middleware', err);
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong!',
  });
});

const port = 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});


