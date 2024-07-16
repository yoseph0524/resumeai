"use client";

import React, { useRef, useState } from "react";
import "./analyze.css";
import { CreateResume, Download } from "./script";

export default function Home() {
  const dataa = ` Richard Williams 
  3665 Margaret Street, Houston, TX 47587 
  (770) 625-9669 
  RichardWilliams@gmail.com 
  Financial Advisor with 7+ years of experience delivering nancial/investment advisory services to high value clients. Proven 
  success in managing multi-million dollar portfolios, driving protability, and increasing ROI through skillful strategic 
  planning, consulting, and nancial advisory services. 
  PROFESSIONAL EXPERIENCE 
  WELLS  FARGO ADVISORS, 
  Senior Financial Advisor  Houston, TX 
  August 2020–Present 
  ●  Deliver nancial advice to clients, proposing strategies to achieve short- and long-term objectives for 
  investments, insurance, business and estate planning with minimal risk 
  ●  Develop, review, and optimize investment portfolios for 300+ high value clients with over $190M AUM 
  (Assets Under Management) 
  ●  Ensure maximum client satisfaction by providing exceptional and personalized service, enhancing 
  client satisfaction ratings from 88% to 99.9% in less than 6 months 
  ●  Work closely with specialists from multiple branches, managing investment portfolios for over 800 
  clients with over $25M in assets under care 
  SUNTRUST INVESTMENT SERVICES, INC. 
  Financial Advisor  New Orleans, LA 
  July 2017–August 2020 
  ●  Served as knowledgeable nancial advisor to clients, managing an over $20.75M investment portfolio of 
  90+ individual and corporate clients 
  ●  Devised and applied a new training and accountability program that increased productivity from #10 to 
  #3 in the region in less than 2 year period 
  ●  Partnered with cross-functional teams in consulting with clients to provide asset management risk 
  strategy and mitigation, which increased AUM by 50% 
  MAVERICK CAPITAL MANAGEMENT 
  Financial Advisor  New Orleans, LA 
  July 2014–August 2017 
  ●  Served as the primary point of contact for over 15 clients 
  ●  Managed the portfolios of several major clients with over $8.5M in total assets 
  EDUCATION 
  LOUISIANA STATE UNIVERSITY 
  Bachelor of Science in Business Administration (concentration: nance), 
  Honors: cum laude (GPA: 3.7/4.0)  Baton Rouge, LA 
  May 2014 
  ADDITIONAL SKILLS 
  ●  Procient in MS Oce (Word, Excel, PowerPoint) Outlook, MS Project, Salesforce, TFS Project Management 
  ●  Fluent in English, Spanish, and French  `;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [analyzeMessage, setAnalyzeMessage] = useState(false);
  const [jsonData, setJsonData] = useState({});
  const [resumeData, setResumeData] = useState("");
  const [analyzeData, setAnalyzeData] = useState("");
  const [sampleResume, setSampleResume] = useState("");
  const [sampleJson, setSampleJson] = useState({});
  const fileInputRef = useRef(null);
  const createButtonRef = useRef(null);
  const analyzeButtonRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const cleanJsonString = (jsonString) => {
    // Remove non-printable characters
    jsonString = jsonString.replace(/[^ -~\n\r\t]+/g, "");

    // Escape quotes within the JSON string
    jsonString = jsonString.replace(/\\([\s\S])|(")/g, "\\$1$2");

    return jsonString;
  };

  const uploadFile = async () => {
    setSampleJson({});
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      setLoading(true);
      let text = result.text.replace(/[^ -~\n\r\t]+/g, "");
      uploadResume(text.replace(/"/g, ""));
      console.log(text);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const uploadResume = async (text) => {
    try {
      const response = await fetch(
        "https://fnhlgmlpxaugxpvyayrx2em44i0trwsq.lambda-url.us-east-1.on.aws/resumeai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMessages: [text],
          }),
        }
      );
      const data = await response.json();
      setLoading(false);
      console.log(data.assistant);
      setJsonData(data.assistant);

      setResumeData(JSON.parse(data.assistant));
      analyzeButtonRef.current.classList.add("bounce");
      setTimeout(() => {
        analyzeButtonRef.current.classList.remove("bounce");
      }, 3000); // Duration of the bounce animation
      setUpload();
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        "An error occurred. Please try again. It is most likely that your file is not a resume or in PDF format."
      );
    }
  };
  const fakeData = {
    personalInfo: {
      name: "Yoseph Chong",
      email: "yosephchong0524@gmail.com",
      phone: "7176721827",
      url: "https://codesandbox.io/s",
      website: "",
    },
    summary:
      "Dedicated marketing professional with a proven track record in market analysis and campaign execution. Skilled in both traditional and digital marketing strategies, with a strong foundation in economic principles and project management.",
  };
  const analyzeResume = async (jsonData) => {
    setLoading(true);
    console.log("Type of fakeData:", typeof fakeData);
    console.log("Type of jsonData:", typeof jsonData);
    console.log("Structure of fakeData:", JSON.stringify(fakeData, null, 2));
    console.log(
      "Structure of fakeData2:",
      JSON.stringify(JSON.stringify(fakeData), null, 2)
    );
    let dattaa = JSON.stringify(fakeData).replace(/"/g, "");
    console.log(dattaa);
    console.log("Structure of jsonData:", JSON.stringify(jsonData, null, 2));
    const response = await fetch(
      "https://fnhlgmlpxaugxpvyayrx2em44i0trwsq.lambda-url.us-east-1.on.aws/coverletter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessages: [jsonData],
        }),
      }
    );

    const data = await response.json();
    console.log(data.assistant);
    setLoading(false);
    setAnalyzeData(JSON.parse(data.assistant));
    console.log(JSON.parse(data.assistant));
    createButtonRef.current.classList.add("bounce");
    setTimeout(() => {
      createButtonRef.current.classList.remove("bounce");
    }, 3000); // Duration of the bounce animation
    setAnalyze();
  };
  const makeResume = async (jsonData) => {
    setSampleJson({});
    setLoading(true);
    const response = await fetch(
      "https://fnhlgmlpxaugxpvyayrx2em44i0trwsq.lambda-url.us-east-1.on.aws/makeresume",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessages: [jsonData],
        }),
      }
    );

    const data = await response.json();
    setLoading(false);
    setSampleResume(data.assistant);
    let resume = data.assistant;
    resume = cleanJsonString(resume);
    console.log(data.assistant);
    console.log(resume);
    console.log(JSON.parse(data.assistant));
    setSampleJson(JSON.parse(data.assistant));

    setCreate();
  };

  const handleInputChange = (event, keyPath) => {
    const updatedData = { ...resumeData };
    let obj = updatedData;

    keyPath.forEach((key, index) => {
      if (index === keyPath.length - 1) {
        obj[key] = event.target.value;
      } else {
        obj = obj[key];
      }
    });

    setResumeData(updatedData);
  };
  const renderList = (data, keyPath = [], type = "textarea") => {
    const Element = type;
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
                        renderList(item, [...keyPath, key, index])
                      ) : (
                        <Element
                          value={item}
                          className="resume-textarea"
                          onChange={(e) =>
                            handleInputChange(e, [...keyPath, key, index])
                          }
                          style={{
                            width: "80%",
                          }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : typeof data[key] === "object" ? (
                renderList(data[key], [...keyPath, key])
              ) : (
                <Element
                  value={data[key]}
                  className="resume-textarea"
                  onChange={(e) => handleInputChange(e, [...keyPath, key])}
                  style={{
                    width: "80%",
                  }}
                />
              )}
            </label>
          </li>
        ))}
      </ul>
    );
  };
  const handleAnalyzeClick = () => {
    console.log(jsonData);
    if (Object.keys(jsonData).length === 0) {
      alert("Error: Your resume data is empty. Please upload a resume file.");
    } else {
      analyzeResume(jsonData.replace(/"/g, ""));
    }
  };
  const handleCreateClick = () => {
    console.log(jsonData);
    if (Object.keys(jsonData).length === 0) {
      alert("Error: Your resume data is empty. Please upload a resume file.");
    } else {
      makeResume(jsonData.replace(/"/g, ""));
    }
  };
  const handleSaveClick = () => {
    console.log("Saved data: ", resumeData);
    setJsonData(JSON.stringify(resumeData));
    console.log(jsonData);
    alert("Changes have been saved!");
  };

  const setUpload = () => {
    setUploadMessage(true);
    setAnalyzeMessage(false);
    setCreateMessage(false);
  };
  const setAnalyze = () => {
    setUploadMessage(false);
    setAnalyzeMessage(true);
    setCreateMessage(false);
  };
  const setCreate = () => {
    setUploadMessage(false);
    setAnalyzeMessage(false);
    setCreateMessage(true);
  };

  const leftArrow = () => {
    if (uploadMessage) {
      setCreate();
    } else if (createMessage) {
      setAnalyze();
    } else {
      setUpload();
    }
  };
  const rightArrow = () => {
    if (uploadMessage) {
      setAnalyze();
    } else if (createMessage) {
      setUpload();
    } else {
      setCreate();
    }
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
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
                            width: "80%",
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
                    width: "80%",
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

  const submitJob = () => {
    const numberInput = document.getElementById("number-input").value;
    console.log(`User input: ${numberInput}`);
    if (numberInput >= 1 && numberInput <= 10) {
      document.getElementById(
        "selected-number"
      ).textContent = `You have selected: ${numberInput}`;
    } else {
      document.getElementById("selected-number").textContent =
        "Please enter a number between 1 and 10.";
    }
  };

  return (
    <div>
      <h1>Analyze The Resume</h1>
      <header>
        <div className="container">
          <div className="div">
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              className="custom-file-upload"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Choose File
            </button>
          </div>
          <div className="div">
            <button id="uploadButton" onClick={uploadFile}>
              Upload
            </button>
          </div>
          <div className="div">
            <button
              className="button"
              ref={analyzeButtonRef}
              onClick={handleAnalyzeClick}
            >
              Analyze
            </button>
          </div>
          <div className="div">
            <button
              className="button"
              ref={createButtonRef}
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>
        </div>
      </header>

      {uploadMessage && (
        <div>
          <div className="message">
            You may change your resume data. Then, Click "Analyze" to analyze
            your resume
          </div>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
      {analyzeMessage && (
        <div className="message">
          You may go back and change your data. Click "Create" to create your
          resume
        </div>
      )}
      {createMessage && (
        <div className="message">
          Click Download to get your resume in PDF. If it is too long, go back
          to upload section and change your resume.
        </div>
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <br />
      <br />

      <div
        className="resumeBody"
        style={!isEmpty(jsonData) ? { display: "grid" } : { display: "none" }}
      >
        <button onClick={leftArrow} className="arrow-button left-arrow">
          &larr;
        </button>
        <div className="resume-container">
          <div
            style={uploadMessage ? { display: "block" } : { display: "none" }}
          >
            <div id="jsonData" className="resume-editor">
              {renderList(resumeData)}
            </div>
          </div>
          <div
            style={analyzeMessage ? { display: "block" } : { display: "none" }}
          >
            <div id="jsonData" className="resume-editor">
              {renderDiv(analyzeData)}
            </div>
          </div>
          <div
            style={createMessage ? { display: "block" } : { display: "none" }}
          >
            <div>
              {!loading && Object.keys(sampleJson).length > 0 && (
                <>
                  <button onClick={Download}>Download</button>
                  <br />
                  <CreateResume resumeData={sampleJson} />
                </>
              )}
            </div>
          </div>
        </div>
        <button onClick={rightArrow} className="arrow-button right-arrow">
          &rarr;
        </button>
      </div>
      <br />
    </div>
  );
}
