"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Nav from "../nav";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDisclosure } from "@chakra-ui/react";
import FileUploadModal from "../[number]/create/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [resumeDataList, setResumeDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(null);
  const [type, setType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const onsubmit = async (data, titleName = title) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = collection(db, "users", user.uid, "resume_data");
        const newDocId = `${number}`; // Example of generating a custom ID
        const docRef = doc(userRef, newDocId);
        console.log(docRef);
        await setDoc(docRef, data);
        console.log(titleName);
        await updateDoc(docRef, { title: { name: titleName, number: number } });
        console.log("Resume data successfully added with ID:", newDocId);
        fetchResumeData(); // Fetch the updated list after adding a new document
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      onClose();
    }
  };

  const fetchResumeData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);

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
    setNumber(Date.now());
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchResumeData();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleResumeClick = (index) => {
    router.push(`/${index}/create/personalInfo`);
  };

  const handleCreateClick = () => {
    setType("create");
    onOpen();
  };

  const changeTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const makeTitle = () => {
    console.log(title);
    onsubmit(fakeFinalData, title);
    onClose();
    router.push(`/${number}/create/personalInfo`);
  };

  const handleAnalyzeClick = () => {
    setType("analyze");
    console.log("yes");
    onOpen();
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    console.log(file);
  };

  const handleModalClose = () => {
    if (selectedFile) {
      setUploading(true);
      uploadFile(selectedFile);
    } else {
      onClose();
    }
  };

  const uploadFile = async (file) => {
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

      console.log(result);
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
      onsubmit(JSON.parse(data.assistant));
      setUploading(false);
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        "An error occurred. Please try again. It is most likely that your file is not a resume or in PDF format."
      );
      onClose();
    }
  };

  const handleEdit = async (number) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid, "resume_data", resumeNumber);
        await deleteDoc(docRef);
        console.log("Resume data successfully deleted with ID:", resumeNumber);
        fetchResumeData(); // Fetch the updated list after deleting a document
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDelete = async (resumeNumber) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "resume_data",
          String(resumeNumber)
        );
        console.log(docRef);
        await deleteDoc(docRef);
        console.log("Resume data successfully deleted with ID:", resumeNumber);
        fetchResumeData(); // Fetch the updated list after deleting a document
      } else {
        console.log("No user is signed in.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <Container>
        <ResumeList>
          <ResumeItem>
            <Button onClick={handleAnalyzeClick}>Analyze</Button>
            <Button onClick={handleCreateClick}>Create</Button>
            <FileUploadModal
              isOpen={isOpen}
              onClose={handleModalClose}
              makeTitle={makeTitle}
              changeTitle={changeTitle}
              onFileSelect={handleFileSelect}
              uploading={uploading}
              type={type}
            />
          </ResumeItem>
          {loading ? (
            <></>
          ) : (
            resumeDataList
              .slice()
              .reverse()
              .map((resume, index) => (
                <ResumeItem key={index}>
                  <Button
                    onClick={() => handleResumeClick(resume.title.number)}
                  >
                    {resume.title.name}
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(resume.title.number);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </Button>
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
  height: 200px;
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
