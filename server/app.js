// GLOBAL IMPORTS
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// LOCAL IMPORTS
const appointments = require("./routes/appointments");

// CONFIG
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/appointments", appointments);

// SERVER
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Home!",
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
