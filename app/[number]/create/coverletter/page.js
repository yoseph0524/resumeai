"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import { CreateCoverLetter } from "./script";
import { Required, RequiredText, buttonStyle } from "../component";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import based on your project structure
import { getNumber } from "../script";

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
  const [coverletterInfo, setCoverletterInfo] = useState({
    job: "",
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
  });
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);

  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
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
            if (data.personalInfo) setPersonalInfo(data.personalInfo);
            if (data.experience) setExperience(data.experience);
            if (data.education) setEducation(data.education);
            if (data.project) setProject(data.project);
            if (data.certification) setCertification(data.certification);
            if (data.coursework) setCoursework(data.coursework);
            if (data.skill) setSkill(data.skill);
            if (data.summary) setSummary(data.summary);
            if (data.coverletterInfo) setCoverletterInfo(data.coverletterInfo);
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
    if (!loading) {
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
    }
  }, [
    personalInfo,
    experience,
    education,
    project,
    certification,
    coursework,
    skill,
    summary,
    coverletterInfo,
    loading,
  ]);

  const makeCoverletter = async () => {
    setLoading(true);

    let ddd = JSON.stringify(finalJson)
      .replace(/"/g, "")
      .replace(/\\,/g, "")
      .replace(/\\/g, "")
      .replace(/ {10}/g, "");

    const response = await fetch(
      "https://z2hmuccc2gtnxsf4o3maruls6y0yvmxn.lambda-url.us-east-1.on.aws/coverletter",
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

  const handleChange = (e) => {
    setCoverletterInfo({ ...coverletterInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const collectionRef = collection(db, "users", user.uid, "resume_data");

        const docRef = doc(collectionRef, number);

        await updateDoc(docRef, { coverletterInfo });
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
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("Failed to update data.");
      }
    } else {
      alert("No user is signed in.");
    }
  };

  return (
    <div>
      <Navbar activepath="/create/coverletter" />
      <div className="container2">
        <button style={buttonStyle} onClick={makeCoverletter}>
          Create Coverletter
        </button>
        {loading && <p>Loading...</p>}
        <form className="form" id="coverletterInfoForm" onSubmit={handleSubmit}>
          <label className="label">Desired Job:</label>
          <input
            type="text"
            id="job"
            name="job"
            value={coverletterInfo.job}
            onChange={handleChange}
            className="input"
          />
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
          />

          <label className="label">Employer's City:</label>
          <input
            type="text"
            id="employer_city"
            name="employer_city"
            value={coverletterInfo.employer_city}
            onChange={handleChange}
            className="input"
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
            <button style={buttonStyle} type="submit" className="button">
              Save
            </button>
            <button style={buttonStyle} onClick={makeCoverletter}>
              Create Coverletter
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
