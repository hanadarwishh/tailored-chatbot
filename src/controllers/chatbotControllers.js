const requestService = require("../services/chatbotServices");

async function sendMessage(req, res) {
  const { files } = req;
  const query = req.body.query;
  const sessionId = req.body.session_id;

  if (!query || !sessionId || files.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await requestService.sendRequestToFlask(
      files,
      query,
      sessionId
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  sendMessage,
};
