const requestService = require("../services/chatbotServices");

async function multiPurposeChatbot(req, res) {
  const { files } = req;
  const query = req.body.query;
  const studentId = req.user.userid;

  if (!query || !studentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await requestService.multiPurposeChatbot(
      files,
      query,
      studentId
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function courseChatbot(req, res) {
  const query = req.body.query;
  const studentId = req.user.userid;
  const course_name = req.body.course_name;
  const course_code = req.body.course_code;

  if (!query || !studentId || !course_name) {
    console.log(query);
    console.log(studentId);
    console.log(course_name);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await requestService.courseChatbot(
      query,
      studentId,
      course_code,
      course_name
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function courseChatbot(req, res) {
//   const query = req.body.query;
//   const studentId = req.user.userid;
//   const course_name = req.body.course_name;

//   if (!query || !studentId || !course_name) {
//     console.log(query);
//     console.log(studentId);
//     console.log(course_name);
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const response = await requestService.courseChatbot(
//       query,
//       studentId,
//       course_name
//     );
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function getMultiPurposeHistory(req, res) {
  console.log("here");
  const studentId = req.user.userid;

  try {
    const response = await requestService.getMultiPurposeHistory(studentId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  multiPurposeChatbot,
  courseChatbot,
  getMultiPurposeHistory,
};
