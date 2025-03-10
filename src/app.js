const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes/chatbotRoutes");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use("/api/chatbot", routes);
app.use("/api", (req, res, next) => {
  next();
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
