"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDisclosure } from "@chakra-ui/react";
import { useAuth } from "./Auth/AuthContext";
import { db, auth } from "./firebase";
import FileUploadModal from "./[number]/create/modal";

export default function Nav() {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
    router.push("/Auth/SignIn");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
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
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
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
  const uploadFile = async (pdfFile) => {
    if (!pdfFile) return;

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();

      // Load PDF with pdf.js
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          text += item.str + " ";
        });
      }

      // Clean up the text
      const cleanedText = text.replace(/[^ -~\n\r\t]+/g, "").replace(/"/g, "");

      console.log(cleanedText);

      // Upload resume function (dummy function, replace with your actual upload function)
      uploadResume(cleanedText);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
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

  return (
    <NavContainer>
      <NavSection>
        <NavButton
          onClick={() => {
            router.push("/Dashboard");
          }}
        >
          Dashboard
        </NavButton>
        <NavButton onClick={handleAnalyzeClick}>Analyze</NavButton>
        <NavButton onClick={handleCreateClick}>Create</NavButton>
        <FileUploadModal
          isOpen={isOpen}
          onClose={handleModalClose}
          makeTitle={makeTitle}
          changeTitle={changeTitle}
          onFileSelect={handleFileSelect}
          uploading={uploading}
          type={type}
        />
      </NavSection>
      <NavSection>
        <NavButton
          onClick={() => {
            router.push("/UserSetting");
          }}
        >
          User Setting
        </NavButton>
        <NavButton onClick={handleLogout}>Log Out</NavButton>
      </NavSection>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
  width: 120px;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button`
  margin: 10px 0;
  padding: 10px 0px;
  font-size: 12px;
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
