const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const logger = require('./app/logger');
const router = require("./app/routes/routes");
const withoutAuth = require("./app/routes/withoutAuth");

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
db.init();

// routes
app.use(router);
app.use(withoutAuth);

const port = 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
