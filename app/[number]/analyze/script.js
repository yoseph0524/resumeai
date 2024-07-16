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

export const CreateResume = ({ resumeData }) => {
  resetDoc();
  const exists = (prop) => {
    return resumeData[prop] && resumeData[prop].length !== 0;
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const bulletPoint = "\u2022";

  // Margins
  const leftMargin = 1;
  const rightMargin = 20;
  const topMargin = 1.4;
  let yOffset = topMargin;

  doc.setFont("times", "normal");
  doc.setLineWidth(0.03);

  if (exists("personalInformation")) {
    const personal = resumeData.personalInformation;
    for (const key in personal) {
      if (key == "name") {
        doc.setFontSize(24);
        doc.text(personal[key], 10.5, topMargin, { align: "center" });
        yOffset += 0.4;
        doc.line(leftMargin, yOffset, rightMargin, yOffset);
        yOffset += 0.1;
        doc.setFontSize(11);
      } else {
        if (personal[key].length == 0) continue;
        yOffset += 0.5;
        doc.text(personal[key], 10.5, yOffset, { align: "center" });
      }
    }
  }

  yOffset += 0.5;
  doc.line(leftMargin, yOffset, rightMargin, yOffset);

  if (exists("summary") && resumeData.summary.length !== 0) {
    yOffset += 0.7;
    const summaryText = doc.splitTextToSize(resumeData.summary, 19);
    doc.setFont("times", "italic");
    doc.text(summaryText, 10.5, yOffset, { align: "center" });
    yOffset += summaryText.length * 0.5;
  }

  yOffset += 0.4;
  if (exists("education")) {
    doc.setFont("times", "bold");
    doc.text("EDUCATION", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;

    const educationArray = resumeData.education;
    educationArray.forEach((education) => {
      yOffset += 0.5;
      let locationWritten = false;
      let dateWritten = false;
      for (const key in education) {
        if (education.hasOwnProperty(key)) {
          if (Array.isArray(education[key])) {
            if (education[key].length === 0) continue;
            const upperKey = capitalizeFirstLetter(key);
            let text = `${upperKey}: `;
            education[key].forEach((course, index) => {
              text += course;
              if (index < education[key].length - 1) {
                text += ", ";
              }
            });
            const summaryText = doc.splitTextToSize(text, 19);
            doc.text(summaryText, leftMargin, yOffset);
            yOffset += summaryText.length * 0.5;
          } else {
            if (key === "institution") {
              doc.setFont("times", "bold");
              doc.text(education[key], leftMargin, yOffset);
              if (education.hasOwnProperty("location")) {
                doc.text(education.location, rightMargin, yOffset, {
                  align: "right",
                });
                locationWritten = true;
              }
              doc.setFont("times", "normal");
            } else if (key === "location" && locationWritten) {
              continue;
            } else if (key === "degree") {
              doc.text(education[key], leftMargin, yOffset);
              if (education.hasOwnProperty("graduation_date")) {
                doc.text(education.graduation_date, rightMargin, yOffset, {
                  align: "right",
                });
                dateWritten = true;
              }
            } else if (key === "graduation_date" && dateWritten) {
              continue;
            } else {
              doc.text(education[key], leftMargin, yOffset);
            }
            yOffset += 0.5;
          }
        }
      }
    });
  }
  yOffset += 0.35;

  if (exists("experiences")) {
    doc.setFont("times", "bold");

    doc.text("PROFESSIONAL EXPERIENCE", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;
    resumeData.experiences.forEach((job) => {
      yOffset += 0.2;
      doc.setFont("times", "bold");
      doc.text(`${job.company}`, leftMargin, yOffset);
      doc.text(`${job.location}`, rightMargin, yOffset, {
        align: "right",
      });
      doc.setFont("times", "normal");
      yOffset += 0.5;
      doc.text(`${job.position}`, leftMargin, yOffset);
      doc.setFont("times", "italic");
      doc.text(`${job.start_date} - ${job.end_date}`, rightMargin, yOffset, {
        align: "right",
      });
      doc.setFont("times", "normal");
      yOffset += 0.5;
      job.description.forEach((desc) => {
        const descText = doc.splitTextToSize(` ${bulletPoint} ${desc}`, 19);
        doc.text(descText, leftMargin, yOffset);
        yOffset += descText.length * 0.5;
      });
    });
  }

  yOffset += 0.4;

  if (exists("projects")) {
    doc.setFont("times", "bold");
    doc.text("PROJECTS", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.4;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    resumeData.projects.forEach((project) => {
      doc.setFont("times", "bold");
      doc.text(`${project.name}`, leftMargin, yOffset);
      doc.text(
        `${project.start_date} - ${project.end_date}`,
        rightMargin,
        yOffset,
        { align: "right" }
      );
      doc.setFont("times", "normal");
      yOffset += 0.5;

      for (const key in project) {
        if (key === "description") {
          project[key].forEach((desc) => {
            const descText = doc.splitTextToSize(`${bulletPoint} ${desc}`, 19);
            descText.forEach((line) => {
              doc.text(line, leftMargin, yOffset);
              yOffset += 0.5;
            });
          });
        } else if (
          key === "name" ||
          key === "start_date" ||
          key === "end_date"
        ) {
          continue;
        } else if (Array.isArray(project[key])) {
          const upperKey = capitalizeFirstLetter(key);
          let text = `${upperKey}: `;
          project[key].forEach((course, index) => {
            text += course;
            if (index < project[key].length - 1) {
              text += ", ";
            }
          });
          const summaryText = doc.splitTextToSize(text, 19);
          doc.text(summaryText, leftMargin, yOffset);
          yOffset += summaryText.length * 0.5;
        } else {
          const upperKey = capitalizeFirstLetter(key);
          const extraText = `${upperKey}: ${project[key]}`;
          const extraTextLine = doc.splitTextToSize(extraText, 19);
          doc.text(extraTextLine, leftMargin, yOffset);
          yOffset += extraTextLine.length * 0.5;
        }
      }
    });
  }
  yOffset += 0.4;
  if (exists("additionalSkills")) {
    doc.setFont("times", "bold");
    doc.text("SKILLS", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;
    const skill = resumeData.additionalSkills;

    if (exists("additionalSkills")) {
      const skillArray = resumeData.additionalSkills;
      let text = `${bulletPoint} `;
      skillArray.forEach((skill, index) => {
        text += skill;
        if (index < skillArray.length - 1) {
          text += ", ";
        }
      });
      const summaryText = doc.splitTextToSize(text, 19);
      doc.text(summaryText, leftMargin, yOffset);
    }
  }

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return (
    <div>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px"></iframe>}
    </div>
  );
};

export const Download = () => {
  doc.save(`Resume.pdf`);
};
