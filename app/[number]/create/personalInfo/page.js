"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";
import { Required, RequiredText } from "../component";
import getData, { getNumber } from "../script";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  query,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase"; // Adjust the import based on your project structure
import Nav from "@/app/nav";
import { buttonStyle, marginStyle, topStyle } from "../component";
import { useRouter } from "next/navigation";

export default function PersonalInfo() {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    url: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);

  const number = getNumber();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.personalInfo) {
          console.log(data.personalInfo);
          setPersonalInfo(data.personalInfo);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
          const docRef = doc(collectionRef, number);
          await updateDoc(docRef, { personalInfo });
          console.log("Document updated successfully:", personalInfo);
          alert("Saved!");
        } else {
          console.log("No documents found in the collection.");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("Failed to update data.");
      }
    } else {
      alert("No user is signed in.");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
          const docRef = doc(collectionRef, number);
          await updateDoc(docRef, { personalInfo });
          console.log("Document updated successfully:", personalInfo);
          router.push(`/${number}/create/experience`);
        } else {
          console.log("No documents found in the collection.");
        }
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
      <Navbar activepath="/create/personalInfo" />{" "}
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div className="container2">
          <form className="form" id="personalInfoForm" onSubmit={handleSubmit}>
            <label htmlFor="name" className="label">
              Full Name: <Required />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              className="input"
              required
            />

            <label htmlFor="email" className="label">
              Email: <Required />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              className="input"
              required
            />

            <label htmlFor="phone" className="label">
              Phone Number: <Required />
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              className="input"
              required
            />
            <label htmlFor="url" className="label">
              LinkedIn URL:
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={personalInfo.url}
              onChange={handleChange}
              className="input"
            />
            <label htmlFor="website" className="label">
              Personal Website or Relevant Link
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              className="input"
            />

            <div className="buttonContainer">
              <RequiredText />
              <button style={buttonStyle} type="submit" className="button">
                Save
              </button>
              <button
                style={buttonStyle}
                type="button" // Use type="button" to prevent form submission
                className="button"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
