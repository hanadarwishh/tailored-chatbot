const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function multiPurposeChatbot(files, query, studentId) {
  const form = new FormData();

  files.forEach((file) => {
    form.append("file", fs.createReadStream(file.path));
  });

  form.append("student_input", query);
  form.append("student_id", studentId);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/multi_purpose_chatbot",
      form,
      {
        headers: form.getHeaders(),
        timeout: 60000,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Full error details:",
      error.response?.data.error || error.message
    );
    throw new Error(`Error from Flask API: ${error.response?.data.error}`);
  }
}
async function courseChatbot(query, studentId, course_code, course_name) {
  const form = new FormData();

  // files.forEach((file) => {
  //   form.append("file", fs.createReadStream(file.path));
  //   console.log(file);
  // });

  // form.append("query", query);
  // form.append("student_id", studentId);
  // form.append("course_name", course_name);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/course_chatbot",
      {
        student_id: studentId,
        course_name: course_name,
        course_code: course_code,
        student_input: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Full error details:",
      error.response?.data.error || error.message
    );
    throw new Error(`Error from Flask AP here: ${error.response?.data.error}`);
  }
}

async function getMultiPurposeHistory(studentId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000//multi_purpose_history?student_id=${studentId}`,
      {
        timeout: 60000,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Full error details:",
      error.response?.data.error || error.message
    );
    throw new Error(`Error from Flask API: ${error.response?.data.error}`);
  }
}

module.exports = { multiPurposeChatbot, courseChatbot, getMultiPurposeHistory };
