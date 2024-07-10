"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Resume Builder</h1>
      <p>Click the button below to start building your resume.</p>
      <Link href="/create/personal-info">start</Link>
    </div>
  );
}
