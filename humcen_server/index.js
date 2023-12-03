const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/routes"); // Replace "your_router_file" with the actual path to your router file


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());
const port = 3000;

// Connect to your MongoDB database
mongoose
  .connect(
    process.env.MONGODB_URL || "mongodb://127.0.0.1/humcen_db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(router);



// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
