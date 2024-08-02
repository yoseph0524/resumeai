"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import based on your project structure
import { getNumber } from "../script";
import { buttonStyle, marginStyle, topStyle } from "../component";

export default function Review() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzeLoading, setAnalyzeLoading] = useState(true);
  const [review, setReview] = useState(false);
  const [reviewData, setReviewData] = useState({});
  const [analyzeData, setAnalyzeData] = useState("");

  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log(number);
          const collectionRef = collection(
            db,
            "users",
            user.uid,
            "resume_data"
          );
          const docRef = doc(collectionRef, number);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            setReviewData(data);
            if (data.personalInfo) setPersonalInfo(data.personalInfo);
            if (data.experience) setExperience(data.experience);
            if (data.education) setEducation(data.education);
            if (data.project) setProject(data.project);
            if (data.certification) setCertification(data.certification);
            if (data.coursework) setCoursework(data.coursework);
            if (data.skill) setSkill(data.skill);
            if (data.summary) setSummary(data.summary);
          }
        } catch (error) {
          console.error("Error fetching data from Firestore: ", error);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onClick = () => {
    setReview(true);
    analyzeResume(reviewData);
  };

  const analyzeResume = async (jsonData) => {
    console.log("Type of fakeData:", typeof fakeFinalData);
    console.log("Type of jsonData:", typeof jsonData);
    console.log(jsonData);
    let ddd = JSON.stringify(jsonData)
      .replace(/"/g, "")
      .replace(/\\,/g, "")
      .replace(/\\/g, "")
      .replace(/ {10}/g, "");
    console.log(ddd);
    setAnalyzeLoading(true);
    const response = await fetch(
      "https://z2hmuccc2gtnxsf4o3maruls6y0yvmxn.lambda-url.us-east-1.on.aws/resumeanalyze",
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
    setAnalyzeLoading(false);
    setAnalyzeData(JSON.parse(data.assistant));
  };

  const renderDiv = (data, keyPath = []) => {
    return (
      <ul className="resume-list">
        {Object.keys(data).map((key) => (
          <li key={key} className="resume-list-item">
            <label className="resume-label">
              <strong>{key}:</strong>
              {Array.isArray(data[key]) ? (
                <ul className="resume-sublist">
                  {data[key].map((item, index) => (
                    <li key={index} className="resume-sublist-item">
                      {typeof item === "object" ? (
                        renderDiv(item, [...keyPath, key, index])
                      ) : (
                        <div
                          className="resume-div"
                          style={{
                            width: "95%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            margin: "5px 0",
                          }}
                        >
                          {item}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : typeof data[key] === "object" ? (
                renderDiv(data[key], [...keyPath, key])
              ) : (
                <div
                  className="resume-div"
                  style={{
                    width: "95%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    margin: "5px 0",
                  }}
                >
                  {data[key]}
                </div>
              )}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Navbar activepath="/create/review" />{" "}
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div className="container2">
            <div>
              <Link href={`/${number}/create/download`}>
                <button style={buttonStyle} type="submit">
                  Generate Resume
                </button>
              </Link>
              <button style={buttonStyle} type="submit" onClick={onClick}>
                Generate AI Review
              </button>
            </div>
            <form>
              <h2>Personal Info</h2>
              <div>
                <p>Name: {personalInfo.name}</p>
                <p>Email: {personalInfo.email}</p>
                <p>Phone: {personalInfo.phone}</p>
                {personalInfo.url && <p>URL: {personalInfo.url}</p>}
                {personalInfo.website && <p>Website: {personalInfo.website}</p>}
              </div>

              <h2>Experience</h2>
              {experience.length > 0 && experience[0].position !== "" ? (
                experience.map((exp, index) => (
                  <div key={index}>
                    <p>Position: {exp.position}</p>
                    <p>Company: {exp.company}</p>
                    <p>Location: {exp.location}</p>
                    <p>Start Date: {exp.start_date}</p>
                    <p>End Date: {exp.end_date}</p>
                    <div>
                      <p>Description:</p>
                      {exp.description.map((desc, descIndex) => (
                        <p
                          key={descIndex}
                          style={{ paddingLeft: "2em", textIndent: "-2em" }}
                        >
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No experience added</p>
              )}

              <h2>Project</h2>
              {project.length > 0 && project[0].title !== "" ? (
                project.map((proj, index) => (
                  <div key={index}>
                    <p>Title: {proj.title}</p>
                    <p>Organization: {proj.organization}</p>
                    <p>Start Date: {proj.start_date}</p>
                    <p>End Date: {proj.end_date}</p>
                    <p>URL: {proj.url}</p>
                    <p>Description: {proj.description}</p>
                    <p>Used: {proj.used}</p>
                    <div>
                      <p>Accomplishment:</p>
                      {proj.accomplishment.map((desc, descIndex) => (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No project added</p>
              )}

              <h2>Education</h2>
              {education.length > 0 && education[0].degree !== "" ? (
                education.map((edu, index) => (
                  <div key={index}>
                    <p>Degree: {edu.degree}</p>
                    <p>Institution: {edu.institution}</p>
                    <p>Location: {edu.location}</p>
                    <p>When: {edu.date}</p>
                    <p>Minor: {edu.minor}</p>
                    <p>GPA: {edu.gpa}</p>
                    <div>
                      <p>Additional Information:</p>
                      {edu.extra.map((desc, descIndex) => (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Education added</p>
              )}

              <h2>Certification</h2>
              {certification.length > 0 && certification[0].name !== "" ? (
                certification.map((cert, index) => (
                  <div key={index}>
                    <p>Name: {cert.name}</p>
                    <p>Institution: {cert.institution}</p>
                    <p>Date: {cert.date}</p>
                    <div>
                      <p>Relevant Information:</p>
                      {cert.relevant.map((desc, descIndex) => (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No certification added</p>
              )}

              <h2>Coursework</h2>
              {coursework.length > 0 && coursework[0].title !== "" ? (
                coursework.map((course, index) => (
                  <div key={index}>
                    <p>Name: {course.title}</p>
                    <p>Institution: {course.institution}</p>
                    <p>Date: {course.date}</p>
                    <p>Skill: {course.skill}</p>
                    <div>
                      <p>Description:</p>
                      {course.description.map((desc, descIndex) => (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No coursework added</p>
              )}

              <h2>Skill</h2>
              {skill.length > 0 && skill[0].type !== "" ? (
                skill.map((ski, index) => (
                  <div key={index}>
                    <p>Type: {ski.type}</p>
                    <div>
                      <p>List:</p>
                      {ski.list.map((desc, descIndex) => (
                        <p key={descIndex} style={{ textIndent: "2em" }}>
                          &bull; {desc}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No skill added</p>
              )}

              <h2>Summary</h2>
              <p>{summary || "No summary added"}</p>
            </form>
          </div>
          {review ? (
            analyzeLoading ? (
              <div className="container2">loading</div>
            ) : (
              <div className="container2" style={{ maxWidth: "600px" }}>
                {renderDiv(analyzeData)}
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

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
    employer_address: "",
    employer_city: "",
    employer_state: "",
    employer_zipcode: "",
  },
};
