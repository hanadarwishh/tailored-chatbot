const express = require("express");
const uploadController = require("../controllers/chatbotControllers");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), uploadController.sendMessage);

module.exports = router;
