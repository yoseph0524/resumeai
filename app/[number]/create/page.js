"use client";
import Link from "next/link";
import { getNumber } from "./script";

export default function Home() {
  const number = getNumber();

  return (
    <div className="container">
      <h1>Welcome to Resume Builder</h1>
      <p>Click the button below to start building your resume.</p>
      <Link href={`/${number}/create/personalInfo`}>start</Link>
    </div>
  );
}
