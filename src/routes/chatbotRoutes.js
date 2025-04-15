const express = require("express");
const uploadController = require("../controllers/chatbotControllers");
const { authenticate } = require("../../tailored-microservices-utilities");

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

router.post(
  "/multi-purpose/upload",
  upload.array("file"),
  authenticate,
  uploadController.multiPurposeChatbot
);
router.post(
  "/course/chatbot/upload",
  upload.none(),
  // upload.array("file"),
  authenticate,
  uploadController.courseChatbot
);
router.get(
  "/multi-purpose-history",
  authenticate,
  uploadController.getMultiPurposeHistory
);

module.exports = router;
