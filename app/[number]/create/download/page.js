"use client";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import { CreateResume } from "./script";
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

export default function Download() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [certification, setCertification] = useState([]);
  const [coursework, setCoursework] = useState([]);
  const [skill, setSkill] = useState([]);
  const [summary, setSummary] = useState("");
  const [finalJson, setFinalJson] = useState({});
  const [loading, setLoading] = useState(true);
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
          const querySnapshot = await getDocs(collectionRef);

          const targetDoc = querySnapshot.docs[number];
          const docRef = doc(
            db,
            "users",
            user.uid,
            "resume_data",
            targetDoc.id
          );

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
    summary
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
        summary
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
    loading,
  ]);

  console.log(finalJson);

  return (
    <div>
      <Navbar activepath="/create/download" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="message">
            If the resume is cut off, it indicates that you have included more
            information than necessary. Please go back and condense the content.
          </div>
          <br />
          <CreateResume resumeData={finalJson} />
        </div>
      )}
    </div>
  );
}
