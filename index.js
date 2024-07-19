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
  let { userMessages, assistantMessages } = req.body;

  let messages = [
    {
      role: "system",
      content: `You are a resume parser. Your task is to break down the given resume information into a structured JSON format. You should include every detail given the data and structure where it belongs to. If you think some data belongs to one, you must make those data into object and put it for that one. Capitalize each first word and instead of using underbar use spaces accordingly. For each project and experience, there should be explation or what the person did. Do not forget that
        give it as this json format. if you think the data doesn't have value from what you got, you may enter as blank. Make sure that everything make sense. 
      {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          url: "",
          website: "",
        },
        experience: [
          {
            position: "",
            company: "",
            location: "",
            start_date: "",
            end_date: "",
            description: [""],
          },
        ],
        education: [
          {
            degree: "",
            institution: "",
            location: "",
            date: "",
            minor: "",
            gpa: "",
            extra: [""],
          },
        ],
        project: [
          {
            title: "",
            organization: "",
            start_date: "",
            end_date: "",
            url: "",
            used: "",
            description: "", // this description should be overall explanation of project of just one sentence. Other details must go to accomplishments. 
            accomplishment: [""],
          },
        ],
        certification: [
          {
            name: "",
            institution: "",
            date: "",
            relevant: [""],
          },
        ],
        coursework: [
          {
            title: "",
            institution: "",
            date: "",
            skill: "",
            description: [""],
          },
        ],
        skill: [
          {
            type: "",
            list: [""],
          },
        ],
        summary: "",
        coverletterInfo: { // leave as blank
          your_address: "",
          your_city: "",
          your_state: "",
          your_zipcode: "",
          employer_name: "",
          employer_title: "",
          employer_company: "",
          employer_address: "",
          employer_city: "",
          employer_state: "",
          employer_zipcode: "",
        },
        title: { // leave as blank
          name: "",
          number: "",
        },
       },
       it must be the valid JSON so that user can JSON.parse it.
};`,
    },
    {
      role: "user",
      content: `Breakdown the resume. Given the information, you will breakdown the personal information, objective (if there is), education, experience and more categories
        
`,
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

  const maxRetries = 3;
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(
        `Error fetching data, retrying (${retries}/${maxRetries})...`
      );
    }
  }

  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

app.post("/resumeanalyze", async function (req, res) {
  let { userMessages } = req.body;

  let messages = [
    {
      role: "system",
      content: `You are a resume consultant. There is no resume that you can analyze better. Your analyzation is the best in the world so that the applicant with your resume can easily get accepted. Give your recommendation or analysis mainly on projects and experience, but you can also point out other things as well. If you think there should be an improvement, give examples of how to write it using the data given. That is, you must include examples every time you want to point out if there needs to be an improvement. Focus more on how it can be improved. Also, give an overall comment with a score out of 10 with specific reasons. Provide the analysis in the following JSON format:

{
    "Overview": "Overall summary of the resume",
    "Sections": [
        {
            "Category": "Section Title (e.g., Professional Experience)",
            "Items": [
                {
                    "Title": "Item Title (e.g., Company Name)",
                    "Improvement": "Specific area of improvement",
                    "Suggested Improvement": "Example of how to improve it"
                }
                // Additional items...
            ]
        }
        // Additional sections...
    ],
    "Additional Skills": "Recommendations for additional skills or certifications",
    "Formatting": "Suggestions for improving formatting",
    "Final Overview": "Final overall assessment",
    "Rating": "Score out of 10",
    "Rating Comment": "Comment explaining the rating"
}
`,
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

  const maxRetries = 3;
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(
        `Error fetching data, retrying (${retries}/${maxRetries})...`
      );
    }
  }
  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

app.post("/makeresume", async function (req, res) {
  let { userMessages } = req.body;

  let messages = [
    {
      role: "system",
      content: `You are a resume builder. Using the data given by user and your knowledge, you can easily build the resume that has 100% acceptance rate from compony. Your resume is so perfect that everybody will use it for template. You are the best at explaining what you did for your experience and projects that includes all the major details and must show you are very proficient. The employers must be amused by it. Provide the analysis in the following JSON format:
{
    // Provide information, if the data exist. You do not need to give all of the data. If the data is not provided to you, leave it blank "" or make it into an empty object. Also, outside of this template, fill free to add more details like GPA or any awards if there are.
    "personalInformation: {
        "name": "Name of the User",
        "address": "Address of the User",
        "phone": "Phone number of the User",
        "email": "Email address of the User",
        // more information about the user. 
    },
    "summary": "Summary of the User explaining his or her interest and strengths for a job",
    "education": [
        {
          "institution" : "Institution that User Went",
          "location": "Location of the Institution",
          "degree": "The Degree that User have",
          "graduation_date": "Graduation date from the institution. if the user didn't graduate yet, then write expected date",
          "honors": "Any Honors that user mentions in a list",
          "coursework": "Any Coursework that user provides in a one single array of list",
        }, 
        // Additional education if there is...
    ],
    "experiences": [
        {
          "company": "Company Name of Experience",
          "position": "Position of the User",
          "location": "Location of the company that user experienced",
          "start_date": "Start date of the experience",
          "end_date": "End date of the experience, if currently working, say Present",
          "description": [
            // Write descriptions about your experience. Given the provided information, you must change to improve it that matches more to the user's wanted job. make it concise but impactful
          ]
        },
        // Additional experience with same format...
    ],
    "projects": [
        {
          "name": "Name of the Project",
          "start_date": "Start date of the experience",
          "end_date": "End date of the experience, if currently working, say Present",
          "explation": "Description of the Project", // make it concise
          "used": "what did or how did user used to do this project in a list",
          "description": [
            // Write descriptions about your project. Given the provided information, you must change to improve it that matches more to the user's wanted job.
          ]
        },
        // Additional projects with same format...
    ]
    "additionalSkills": "Additional skills that user has provided, give as one single array of list. ",
}`,
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

  const maxRetries = 3;
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(
        `Error fetching data, retrying (${retries}/${maxRetries})...`
      );
    }
  }
  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

app.post("/coverletter", async function (req, res) {
  let { userMessages } = req.body;

  let messages = [
    {
      role: "system",
      content: `You are the best coverletter maker. Given the json data of resume infomation, your job is to make a perfect coverletter to hook the employers. You should return it as the following format in JSON: 
{
    "your_contact_information": {
        "name": "your name", // John Doe
        "address": "your address", // 123 Main St
        "city": "your address city", // LA
        "state": "your address state", // CA
        "zip": "your address zip", // 90001
        "email": "your email", // john.doe@example.com
        "phone": "your phone number" // (123) 456-7890
    },
    "employer_contact_information": {
        "name": "employer name", // Jane Smith
        "title": "employer title", // Hiring Manager
        "company": "company name", // ABC Company
        "address": "company address", // 456 Corporate Dr
        "city": "company city", // City
        "state": "company state", // State
        "zip": "company zip" // ZIP
    },
    "saluation": "Dear employer name,", // Dear Jane Smith,
    "introduction": "A paragraph, at least 150 words, that should include the purpose of the letter, name of the organization, job title for which you are applying where you found the job advertisement, what makes you a fit for the organization. ",
    "firstBody": "A paragraph, at least 150 words, that describe one experience that is both impressive and relevant to the job. Be detail, specific, and hooking.",
    "secondBody": "A paragraph, at least 150 words, that describe a second experience that is both impressive and relevant. Highlight the skills this experience demonstrates. Be detail, specific, and hooking.",
    "conclusion": "A paragraph, at least 150 words, that summarize your skills and experiences, reiterate your interest in the position, reiterate the job title and organization, and include your email and phone number",
    "closing": {
        "closing_sentence":"Thank you for your time in considereing my resume.",
        "closing_phrase": "Sincerely,", // Sincerely,
        "name": "your name" // John Doe
    }
    
    there may be some info (most likely related to address) that is missing. You must leave it as blank. don't ask but try your best to make a coverletter that is most fitted and hooking.
}


`,
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

  const maxRetries = 3;
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(
        `Error fetching data, retrying (${retries}/${maxRetries})...`
      );
    }
  }
  let resume = completion.choices[0].message["content"];
  res.json({ assistant: resume });
});

module.exports.handler = severless(app);
