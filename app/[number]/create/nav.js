"use client";
import Link from "next/link";
import "./layout";
import { useAuth } from "../../Auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getNumber } from "./script";

export default function Navbar({ activepath }) {
  let activePath = activepath;
  const [uid, setUID] = useState("");
  const { authUser, signOut } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
      } else {
      }
    });
    return () => {
      listen();
    };
  }, []);

  const user = auth.currentUser;

  const number = getNumber();
  const handleLogout = async () => {
    await signOut();
    router.push("/Auth/SignIn");
  };
  return (
    <div>
      <div>
        <div>
          <h1>Create Resume</h1>
        </div>
        <nav className="navbar">
          <Link
            href={`/${number}/create/personalInfo`}
            className={activePath === "/create/personalInfo" ? "active" : ""}
          >
            Personal Info
          </Link>
          <Link
            href={`/${number}/create/experience`}
            className={activePath === "/create/experience" ? "active" : ""}
          >
            Experience
          </Link>
          <Link
            href={`/${number}/create/project`}
            className={activePath === "/create/project" ? "active" : ""}
          >
            Project
          </Link>
          <Link
            href={`/${number}/create/education`}
            className={activePath === "/create/education" ? "active" : ""}
          >
            Education
          </Link>

          <Link
            href={`/${number}/create/certification`}
            className={activePath === "/create/certification" ? "active" : ""}
          >
            Certification
          </Link>
          <Link
            href={`/${number}/create/coursework`}
            className={activePath === "/create/coursework" ? "active" : ""}
          >
            Coursework
          </Link>
          <Link
            href={`/${number}/create/skill`}
            className={activePath === "/create/skill" ? "active" : ""}
          >
            Skill
          </Link>
          <Link
            href={`/${number}/create/summary`}
            className={activePath === "/create/summary" ? "active" : ""}
          >
            Summary
          </Link>
          <Link
            href={`/${number}/create/review`}
            className={activePath === "/create/review" ? "active" : ""}
          >
            Review
          </Link>
          <Link
            href={`/${number}/create/download`}
            className={activePath === "/create/download" ? "active" : ""}
          >
            Download
          </Link>
          <Link
            href={`/${number}/create/coverletter`}
            className={activePath === "/create/coverletter" ? "active" : ""}
          >
            AI Coverletter
          </Link>
        </nav>
      </div>
    </div>
  );
}
