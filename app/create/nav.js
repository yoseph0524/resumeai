"use client";
import Link from "next/link";
import "./layout";

export default function Navbar({ activepath }) {
  let activePath = activepath;

  return (
    <div>
      <div>
        <h1>Create Resume</h1>
        <nav className="navbar">
          <Link
            href="/create/personal-info"
            className={activePath === "/create/personal-info" ? "active" : ""}
          >
            Personal Info
          </Link>
          <Link
            href="/create/experience"
            className={activePath === "/create/experience" ? "active" : ""}
          >
            Experience
          </Link>
          <Link
            href="/create/project"
            className={activePath === "/create/project" ? "active" : ""}
          >
            Project
          </Link>
          <Link
            href="/create/education"
            className={activePath === "/create/education" ? "active" : ""}
          >
            Education
          </Link>

          <Link
            href="/create/certification"
            className={activePath === "/create/certification" ? "active" : ""}
          >
            Certification
          </Link>
          <Link
            href="/create/coursework"
            className={activePath === "/create/coursework" ? "active" : ""}
          >
            Coursework
          </Link>
          <Link
            href="/create/skill"
            className={activePath === "/create/skill" ? "active" : ""}
          >
            Skill
          </Link>
          <Link
            href="/create/summary"
            className={activePath === "/create/summary" ? "active" : ""}
          >
            Summary
          </Link>
          <Link
            href="/create/review"
            className={activePath === "/create/review" ? "active" : ""}
          >
            Review
          </Link>
          <Link
            href="/create/download"
            className={activePath === "/create/download" ? "active" : ""}
          >
            Download
          </Link>
          <Link
            href="/create/coverletter"
            className={activePath === "/create/coverletter" ? "active" : ""}
          >
            AI Coverletter
          </Link>
        </nav>
      </div>
    </div>
  );
}
