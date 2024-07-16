"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Nav from "../nav";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getNumber } from "../[number]/create/script";

export default function Dashboard() {
  const [resumeDataList, setResumeDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const onsubmit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = collection(db, "users", user.uid, "resume_data");
        await addDoc(userRef, fakeFinalData);
        console.log("Resume data successfully added!");
        fetchResumeData(); // Fetch the updated list after adding a new document
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchResumeData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        console.log("2");
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);
        console.log("3");
        const resumes = querySnapshot.docs.map((doc) => doc.data());

        setResumeDataList(resumes);
        console.log(resumes);
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("1");
        await fetchResumeData();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const number = getNumber();
  const router = useRouter();
  const handleAnalyzeClick = () => {
    router.push(`/${number + 1}/create`);
  };

  const handleCreateClick = () => {
    onsubmit();
    router.push(`/${number + 1}/create`);
  };

  const handleResumeClick = (index) => {
    router.push(`/${index}/create`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <Container>
        <ResumeList>
          <ResumeItem>
            <Button onClick={handleAnalyzeClick}>Analyze</Button>
            <Button onClick={handleCreateClick}>Create</Button>
          </ResumeItem>
          {loading ? (
            <></>
          ) : (
            resumeDataList
              .slice()
              .reverse()
              .map((resume, index) => (
                <ResumeItem
                  onClick={() => handleResumeClick(index)}
                  key={index}
                >
                  <p>{resume.personalInfo.name}</p>
                </ResumeItem>
              ))
          )}
        </ResumeList>
      </Container>
    </div>
  );
}

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
`;

const ResumeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ResumeItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }

  &:focus {
    outline: none;
  }
`;

const fakeFinalData = {
  personalInfo: {
    name: "John Doe",
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
      description: "",
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
  coverletterInfo: {
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
};
