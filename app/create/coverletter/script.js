"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";

let doc = new jsPDF({
  unit: "cm",
  format: "a4",
  lineHeight: 1.2,
});

const resetDoc = () => {
  doc = new jsPDF({
    unit: "cm",
    format: "a4",
    lineHeight: 1.2,
  }); // This resets the document
};

export const CreateCoverLetter = ({ resumeData }) => {
  resetDoc();
  const exists = (prop) => {
    return resumeData[prop] && resumeData[prop].length !== 0;
  };
  const addTextIfExists = (text, yOffsetIncrement = 0.5) => {
    if (text) {
      doc.text(text, leftMargin, yOffset);
      yOffset += yOffsetIncrement;
    }
  };

  const leftMargin = 2;
  const rightMargin = 20;
  const topMargin = 3.0;
  let yOffset = topMargin;

  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setLineWidth(0.03);

  if (exists("your_contact_information")) {
    console.log("yes");
    const personal = resumeData.your_contact_information;
    addTextIfExists(personal.name);
    addTextIfExists(personal.address);

    const addressComponents = [];

    if (personal.city) addressComponents.push(personal.city);
    if (personal.state) addressComponents.push(personal.state);
    if (personal.zip) addressComponents.push(personal.zip);

    if (addressComponents.length > 0) {
      const addressLine = addressComponents.join(", ");
      addTextIfExists(addressLine);
    }
  }
  yOffset += 0.7;

  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = today.getFullYear();
  const month = monthNames[today.getMonth()]; // Get the month name
  const day = today.getDate();

  const formattedDate = `${month} ${day}, ${year}`;

  doc.text(formattedDate, leftMargin, yOffset);
  yOffset += 0.5;

  yOffset += 0.7;

  if (exists("employer_contact_information")) {
    const employer = resumeData.employer_contact_information;

    // Helper function to add text if it exists

    // Add the employer's name and title if they exist
    if (employer.name && employer.title) {
      const firstLine = employer.name + ", " + employer.title;
      addTextIfExists(firstLine);
    } else {
      addTextIfExists(employer.name);
      addTextIfExists(employer.title);
    }

    addTextIfExists(employer.company);

    addTextIfExists(employer.address);

    const addressComponents = [];

    if (employer.city) addressComponents.push(employer.city);
    if (employer.state) addressComponents.push(employer.state);
    if (employer.zip) addressComponents.push(employer.zip);

    if (addressComponents.length > 0) {
      const addressLine = addressComponents.join(", ");
      addTextIfExists(addressLine);
    }
  }

  yOffset += 0.7;

  if (exists("saluation")) {
    doc.text(resumeData.saluation, leftMargin, yOffset);
    yOffset += 0.5;
  }

  yOffset += 0.7;

  if (exists("introduction")) {
    const descText = doc.splitTextToSize(resumeData.introduction, 17);
    descText.forEach((line) => {
      doc.text(line, leftMargin, yOffset);
      yOffset += 0.5;
    });
  }
  yOffset += 0.7;

  if (exists("firstBody")) {
    const descText = doc.splitTextToSize(resumeData.firstBody, 17);
    descText.forEach((line) => {
      doc.text(line, leftMargin, yOffset);
      yOffset += 0.5;
    });
  }
  yOffset += 0.7;

  if (exists("secondBody")) {
    const descText = doc.splitTextToSize(resumeData.secondBody, 17);
    descText.forEach((line) => {
      doc.text(line, leftMargin, yOffset);
      yOffset += 0.5;
    });
  }
  yOffset += 0.7;

  if (exists("conclusion")) {
    const descText = doc.splitTextToSize(resumeData.conclusion, 17);
    descText.forEach((line) => {
      doc.text(line, leftMargin, yOffset);
      yOffset += 0.5;
    });
  }
  yOffset += 0.7;

  if (exists("closing")) {
    const close = resumeData.closing;
    doc.text(close.closing_sentence, leftMargin, yOffset);
    yOffset += 1.0;
    doc.text(close.closing_phrase, leftMargin, yOffset);
    yOffset += 1.0;
    doc.text(close.name, leftMargin, yOffset);
    yOffset += 1.0;
  }

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return (
    <div>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px"></iframe>}
    </div>
  );
};

export const Downloadpdf = () => {
  doc.save(`Resume.pdf`);
};
