"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import { json } from "react-router-dom";
import { CreateCoverLetter } from "./script";
import { Required, RequiredText } from "../component";

export default function Coverletter() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");
  const [finalJson, setFinalJson] = useState({});
  const [coverletter, setCoverletter] = useState({});
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);

  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem("personalInfo");
    const storedExperience = localStorage.getItem("experience");
    const storedEducation = localStorage.getItem("education");
    const storedProject = localStorage.getItem("project");
    const storedCertification = localStorage.getItem("certification");
    const storedCoursework = localStorage.getItem("coursework");
    const storedSkill = localStorage.getItem("skill");
    const storedSummary = localStorage.getItem("summary");

    if (storedPersonalInfo) setPersonalInfo(JSON.parse(storedPersonalInfo));
    if (storedExperience) setExperience(JSON.parse(storedExperience));
    if (storedEducation) setEducation(JSON.parse(storedEducation));
    if (storedProject) setProject(JSON.parse(storedProject));
    if (storedCertification) setCertification(JSON.parse(storedCertification));
    if (storedCoursework) setCoursework(JSON.parse(storedCoursework));
    if (storedSkill) setSkill(JSON.parse(storedSkill));
    if (storedSummary) setSummary(storedSummary);
  }, []);

  const createFinalJson = (
    personalInfo,
    experience,
    education,
    project,
    certification,
    coursework,
    skill,
    summary,
    coverletterInfo
  ) => {
    return {
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary,
      coverletterInfo,
    };
  };

  useEffect(() => {
    const finalData = createFinalJson(
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary,
      coverletterInfo
    );
    console.log(finalData);
    setFinalJson(finalData);
  }, [
    personalInfo,
    experience,
    education,
    project,
    certification,
    coursework,
    skill,
    summary,
  ]);

  const fakeData = {
    Personal_Information: {
      Name: "Yoseph Chong",
      Location: "Los Angeles, CA 90024",
      Phone: "(717) 672-1827",
      Email: "yoseph0524@g.ucla.edu",
    },
    Objective: {
      Summary:
        "Aspiring full-stack developer with foundational knowledge in both front-end and back-end technologies. Eager to secure an internship, where I can holistically contribute to web projects and further enhance my full-stack capabilities.",
    },
    Education: {
      University: "University of California, Los Angeles",
      Degree: "Bachelor of Science in Computer Science and Engineering",
      Honors: "2023 Dean's List (GPA: 3.8/4.0)",
      "Relevant Coursework": [
        "Artificial Intelligence",
        "Software Construction",
        "Machine Learning",
        "Computer Organization",
        "Logic Design of Digital Systems",
        "Operating Systems",
        "Algorithms and Complexity",
      ],
      Location: "Los Angeles, CA",
      "Expected Graduation": "June 2025",
    },
    "Professional Experience": [
      {
        Company: "California NanoSystems Institute at UCLA",
        Position: "Technician's Assistant",
        Location: "Los Angeles, CA",
        Dates: "August 2022 - Present",
        Responsibilities: [
          "Implemented automation scripts using Python, reducing event setup time by 50% and ensuring timely dissemination of information to users.",
          "Produced 10+ visually captivating digital graphics and animations for online campaigns, resulting in a 40% boost in engagement on professional and social events in CNSI.",
          "Collaborated with the communications team to streamline internal processes, leading to a 25% improvement in workflow efficiency.",
        ],
      },
      {
        Company: "Lancaster Science Factory",
        Position: "Software Intern",
        Location: "Lancaster, PA",
        Dates: "June 2023 - August 2023",
        Responsibilities: [
          "Spearheaded the redevelopment of the company's website, enhancing user experience and increasing site traffic by 30% within three months.",
          "Developed AI chatbots integrated into the company website using NLP in Python.",
          "Led the development and ongoing maintenance of robust RESTful APIs, enabling seamless communication between the company website and external data sources.",
        ],
      },
    ],
    Projects: [
      {
        Project: "Carrot Market",
        Dates: "Dec 2023 - Feb 2024",
        Description:
          "An advanced accommodation-sharing platform where users can upload their products and sell them.",
        "Technologies Used": [
          "NextJS",
          "Prisma",
          "SWR",
          "Cloudflare Streams",
          "Vercel",
        ],
        Features: [
          "Integrated advanced SNS functionalities, such as phone/email authentication and social likes, and live streaming capabilities.",
          "Architected the platform with a serverless infrastructure, ensuring scalability, minimizing server costs, and simplifying administration for a seamless user experience.",
          "Implemented NextJS for building highly responsive React applications, optimizing rendering and load time through state-of-the-art techniques.",
        ],
      },
      {
        Project: "Coincase",
        Dates: "Sep 2023 - Nov 2024",
        Description:
          "Designed to mirror the core functionalities of Coinbase without any of the risk associated with investing in cryptocurrency.",
        "Technologies Used": [
          "NextJS",
          "ChakraUI",
          "Framer-Motion Library",
          "Firebase",
        ],
        "Key Features": [
          "Spearheaded the implementation of key features including user authentication, wallet management, transaction history, and trade functionalities.",
          "Addressed challenges in data sharing, UI/UX design, and API integration, with a focus on enhancing efficiency and user experience.",
        ],
      },
    ],
    "Additional Skills": [
      "ReactJS",
      "NextJS",
      "Python",
      "C++",
      "SQL",
      "NodeJS",
      "Django",
      "MongoDB",
      "AWS S3 & Lambda",
    ],
    employer_contact_information: {
      name: "Emily",
      title: "Hiring Manager",
      company: "APPle",
      address: "Via la manch",
      city: "LA",
      state: "CA",
      zip: "94103",
    },
  };
  const fakeFinalData = {
    personalInfo: {
      name: "Yoseph Chong",
      email: "yosephchong0524@gmail.com",
      phone: "7176721827",
      url: "",
      website: "",
    },
    experience: [
      {
        position: "Technician's Assistant",
        company: "California NanoSystems Institute at UCLA",
        location: "Los Angeles",
        start_date: "August 2022",
        end_date: "Present",
        description: [
          "Implemented automation scripts using Python, reducing event setup time by 50% and ensuring timely dissemination of information to users.",
          "Produced 10+ visually captivating digital graphics and animations for online campaigns, resulting in a 40% boost in engagement on professional and social events in CNSI.",
          "Collaborated with the communications team to streamline internal processes, leading to a 25% improvement in workflow efficiency.",
        ],
      },
      {
        position: "Software Intern",
        company: "Lancaster Science Factory",
        location: "Lancaster, PA",
        start_date: "June 2023",
        end_date: "August 2023",
        description: [
          "Spearheaded the redevelopment of the company's website, enhancing user experience and increasing site traffic by 30% within three months.",
          "Developed AI chatbots integrated into the company website using NLP in Python.",
          "Led the development and ongoing maintenance of robust RESTful APIs, enabling seamless communication between the company website and external data sources.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science and Engineering",
        institution: "UCLA",
        location: "Los Angeles",
        date: "June 2025",
        minor: "",
        gpa: 3.8,
        extra: [],
      },
    ],
    project: [
      {
        title: "Carrot Market",
        organization: "",
        start_date: "Dec 2023",
        end_date: "Feb 2024",
        url: "",
        description: [
          "An advanced accommodation-sharing platform where users can upload their products and sell them.",
        ],
      },
      {
        title: "Coincase",
        organization: "",
        start_date: "Sep 2023",
        end_date: "Nov 2024",
        url: "",
        description: [
          "Designed to mirror the core functionalities of Coinbase without any of the risk associated with investing in cryptocurrency.",
        ],
      },
    ],
    certification: [
      {
        name: "",
        institution: "",
        date: "",
        relevant: [],
      },
    ],
    coursework: [
      {
        title: "",
        institution: "",
        date: "",
        skill: "",
        description: [],
      },
    ],
    skill: [
      {
        type: "Forntend",
        list: ["JAVAscript"],
      },
      {
        type: "Back",
        list: ["python"],
      },
    ],
    summary:
      "Aspiring full-stack developer with foundational knowledge in both front-end and back-end technologies. Eager to secure an internship, where I can holistically contribute to web projects and further enhance my full-stack capabilities.",
    coverletterInfo: {
      your_address: "330 De Neve Drive",
      your_city: "Los Angeles",
      your_state: "CA",
      your_zipcode: "90024",
      employer_name: "Brenda Clark",
      employer_title: "Director",
      employer_company: "Apple",
      employer_address: "5678 Main Street",
      employer_city: "Pembroke",
      employer_state: "NC",
      employer_zipcode: "28372",
    },
  };

  const makeCoverletter = async () => {
    setLoading(true);

    let ddd = JSON.stringify(finalJson)
      .replace(/"/g, "")
      .replace(/\\,/g, "")
      .replace(/\\/g, "")
      .replace(/ {10}/g, "");

    console.log(JSON.stringify(ddd));
    console.log(JSON.stringify(fakeFinalData).replace(/"/g, ""));

    const response = await fetch(
      "https://fnhlgmlpxaugxpvyayrx2em44i0trwsq.lambda-url.us-east-1.on.aws/coverletter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessages: [ddd],
        }),
      }
    );
    const data = await response.json();
    console.log(data.assistant);

    setCoverletter(JSON.parse(data.assistant));
    setLoading(false);
    setIsGenerated(false);
  };

  const storedCoverletterInfo = localStorage.getItem("coverletterInfo");
  const initialCoverletterInfo = storedCoverletterInfo
    ? JSON.parse(storedCoverletterInfo)
    : {
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
      };

  const [coverletterInfo, setCoverletterInfo] = useState(
    initialCoverletterInfo
  );

  const handleChange = (e) => {
    setCoverletterInfo({ ...coverletterInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("coverletterInfo", JSON.stringify(coverletterInfo));
    alert("Saved!");
    console.log(coverletterInfo);
    const finalData = createFinalJson(
      personalInfo,
      experience,
      education,
      project,
      certification,
      coursework,
      skill,
      summary,
      coverletterInfo
    );

    setFinalJson(finalData);
  };

  return (
    <div>
      <Navbar activepath="/create/coverletter" />
      <div className="container">
        <button onClick={makeCoverletter}>Create Coverletter</button>
        {loading && <p>Loading...</p>}
        <form className="form" id="coverletterInfoForm" onSubmit={handleSubmit}>
          <label className="label">
            Your Address: <Required />
          </label>
          <input
            type="text"
            id="your_address"
            name="your_address"
            value={coverletterInfo.your_address}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">
            Your City: <Required />
          </label>
          <input
            type="text"
            id="your_city"
            name="your_city"
            value={coverletterInfo.your_city}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">
            Your State: <Required />
          </label>
          <input
            type="text"
            id="your_state"
            name="your_state"
            value={coverletterInfo.your_state}
            onChange={handleChange}
            className="input"
            required
          />
          <label className="label">
            Your Zipcode: <Required />
          </label>
          <input
            type="text"
            id="your_zipcode"
            name="your_zipcode"
            value={coverletterInfo.your_zipcode}
            onChange={handleChange}
            className="input"
          />

          <label className="label">
            Employer's Name: <Required />
          </label>
          <input
            type="text"
            id="employer_name"
            name="employer_name"
            value={coverletterInfo.employer_name}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">
            Employer's Title: <Required />
          </label>
          <input
            type="text"
            id="employer_title"
            name="employer_title"
            value={coverletterInfo.employer_title}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">
            Employer's Company: <Required />
          </label>
          <input
            type="text"
            id="employer_company"
            name="employer_company"
            value={coverletterInfo.employer_company}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">Employer's Address:</label>
          <input
            type="text"
            id="employer_address"
            name="employer_address"
            value={coverletterInfo.employer_address}
            onChange={handleChange}
            className="input"
            required
          />

          <label className="label">Employer's City:</label>
          <input
            type="text"
            id="employer_city"
            name="employer_city"
            value={coverletterInfo.employer_city}
            onChange={handleChange}
            className="input"
            required
          />
          <label className="label">Employer's State:</label>
          <input
            type="text"
            id="employer_state"
            name="employer_state"
            value={coverletterInfo.employer_state}
            onChange={handleChange}
            className="input"
          />
          <label className="label">Employer's Zipcode:</label>
          <input
            type="text"
            id="employer_zipcode"
            name="employer_zipcode"
            value={coverletterInfo.employer_zipcode}
            onChange={handleChange}
            className="input"
          />

          <div className="buttonContainer">
            <RequiredText />
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
      </div>
      {!loading && !isGenerated && (
        <CreateCoverLetter resumeData={coverletter} />
      )}
    </div>
  );
}

const d = {
  your_contact_information: {
    name: "Yoseph Chong",
    address: "Los Angeles, CA 90024",
    email: "yoseph0524@g.ucla.edu",
    phone: "(717) 672-1827",
  },
  date: "October 4, 2024",
  employer_contact_information: {
    name: "Emily",
    title: "Hiring Manager",
    company: "APPle",
    address: "Via la manch",
    city: "LA",
    state: "CA",
    zip: "94103",
  },
  saluation: "Dear Emily,",
  introduction:
    "I am writing to express my enthusiasm for the full-stack developer internship position at APPle, as advertised. As an aspiring full-stack developer currently studying Computer Science and Engineering at the University of California, Los Angeles, I am excited about the opportunity to contribute holistically to web projects and enhance my capabilities in both front-end and back-end technologies. My educational background and professional experiences have equipped me with the skills necessary to excel in a dynamic and innovative company like APPle.",
  firstBody:
    "During my role as a Technician's Assistant at the California NanoSystems Institute at UCLA, I successfully implemented automation scripts using Python, resulting in a 50% reduction in event setup time. My collaboration with the communications team led to a 25% improvement in workflow efficiency. These experiences have honed my technical abilities and my capacity to work effectively in a team-oriented environment.",
  secondBody:
    "As a Software Intern at Lancaster Science Factory, I spearheaded the redevelopment of the company's website, enhancing user experience and driving a 30% increase in site traffic. Additionally, I developed AI chatbots and maintained robust RESTful APIs, showcasing my proficiency in AI technologies and API integration. These experiences have further developed my problem-solving skills and ability to deliver impactful results.",
  conclusion:
    "In conclusion, my hands-on experience in software development, proficiency in technologies like ReactJS, NextJS, and Python, and my passion for creating innovative solutions make me a strong candidate for the full-stack developer internship at APPle. I am excited about the opportunity to bring my skills to your team and contribute to the continued success of your projects. I am looking forward to the possibility of discussing how my background, skills, and enthusiasms align with the goals of APPle. Please feel free to contact me at yoseph0524@g.ucla.edu or (717) 672-1827. Thank you for considering my application.",
  closing: {
    closing_sentence: "Thank you for your time in considering my resume.",
    closing_phrase: "Sincerely,",
    name: "Yoseph Chong",
  },
};
