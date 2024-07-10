const OpenAI = require("openai");
const express = require("express");
const app = express();
const severless = require("serverless-http");
var cors = require("cors");
//OpenAi
const openai = new OpenAI({
  apiKey: "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",
});

// CORS Issue
let corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
//So that Post Request Can Happen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post Request
app.post("/resumeai", async function (req, res) {
  let { userMessages } = req.body;

  let messages = [
    {
      role: "system",
      content:
        'You are a resume parser. Your task is to break down the given resume information into a structured JSON format with the following categories: Personal Information, Objective, Education, Experience, and Skills. Here is the format you should follow: { "Personal Information": { "Name": "", "Address": "", "Email": "", "Phone": "" }, "Objective": "", "Education": [ { "Degree": "", "Institution": "", "Year": "" } ], "Experience": [ { "Position": "", "Company": "", "Duration": "" } ], "Skills": [] }.',
    },
  ];

  if (userMessages.length != 0) {
    messages.push(
      JSON.parse(
        '{"role": "user", "content": "' +
          String(userMessages.shift()).replace(/\n/g, "") +
          '"}'
      )
    );
  }

  completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  console.log(completion);
  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

app.post("/resumeanalyze", async function (req, res) {
  let { userMessages } = req.body;

  let messages = [
    {
      role: "system",
      content:
        "You are a resume consultant. There is no resume that you can analyze better. Your analyzation is the best in the world so that applicant with your resume can easily get accepted. Give your recommendation or analyztion through bullet points, mainly on project and experience, but you can also point other things as well.",
    },
  ];

  if (userMessages.length != 0) {
    messages.push(
      JSON.parse(
        '{"role": "user", "content": "' +
          String(userMessages.shift()).replace(/\n/g, "") +
          '"}'
      )
    );
  }

  completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  console.log(completion);
  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

//app.listen(8000);
module.exports.handler = severless(app);
