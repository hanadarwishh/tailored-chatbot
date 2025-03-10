const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function sendRequestToFlask(files, query, sessionId) {
  const form = new FormData();

  files.forEach((file) => {
    form.append("files", fs.createReadStream(file.path));
  });

  form.append("query", query);
  form.append("session_id", sessionId);

  try {
    const response = await axios.post("http://localhost:6000/", form, {
      headers: form.getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error from Flask API: ${error.message}`);
  }
}

module.exports = {
  sendRequestToFlask,
};
