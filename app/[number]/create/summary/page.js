"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";
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
import getData, { getNumber } from "../script";
import { buttonStyle, marginStyle, topStyle } from "../component";
import { useRouter } from "next/navigation";

export default function Summary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const number = getNumber();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getData(number);
        if (data && data.summary) {
          console.log(data.summary);
          setSummary(data.summary);
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Query to get the first document in the resume_data collection
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
          const docRef = doc(collectionRef, number);

          // Update the document with the summary field
          await updateDoc(docRef, { summary });
          alert("Saved!");
          console.log(summary);
        } else {
          alert("No resume data found to update.");
        }
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("Failed to update data.");
      }
    } else {
      alert("No user is signed in.");
    }
  };
  const router = useRouter();
  const handleClick = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        // Query to get the first document in the resume_data collection
        const collectionRef = collection(db, "users", user.uid, "resume_data");
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
          const docRef = doc(collectionRef, number);

          // Update the document with the summary field
          await updateDoc(docRef, { summary });
          router.push(`/${number}/create/review`);
        } else {
          alert("No resume data found to update.");
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
      <Navbar activepath="/create/summary" />
      {loading ? (
        <div className="container">Loading...</div>
      ) : (
        <div className="container2">
          <form onSubmit={handleSubmit}>
            <label htmlFor="summary">Professional Summary:</label>
            <textarea
              id="summary"
              name="summary"
              value={summary}
              onChange={handleChange}
              required
            ></textarea>

            <div className="buttonContainer">
              <button style={buttonStyle} type="submit">
                Save
              </button>

              <button style={buttonStyle} type="button" onClick={handleClick}>
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
