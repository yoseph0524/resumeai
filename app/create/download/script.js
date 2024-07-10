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

  console.log(resumeData);
  if (exists("personalInfo")) {
    const personal = resumeData.personalInfo;
    let personalDetails = [];
    for (const key in personal) {
      if (key == "name") {
        doc.setFontSize(24);
        doc.text(personal[key], 10.5, topMargin, { align: "center" });
        yOffset += 0.4;
        doc.line(leftMargin, yOffset, rightMargin, yOffset);
        yOffset += 0.1;
        doc.setFontSize(11);
      } else {
        if (personal[key].length !== 0) {
          personalDetails.push(personal[key]);
        }
      }
    }
    if (personalDetails.length > 0) {
      yOffset += 0.5;
      const detailsText = personalDetails.join(" ");
      const summaryText = doc.splitTextToSize(detailsText, 18);
      const formattedLines = summaryText.map((line) =>
        line.replace(/ /g, " • ")
      );

      formattedLines.forEach((line) => {
        doc.text(line, 10.5, yOffset, { align: "center" });
        yOffset += 0.5;
      });
    }
  }

  doc.line(leftMargin, yOffset, rightMargin, yOffset);

  if (exists("summary") && resumeData.summary.length !== 0) {
    yOffset += 0.7;
    const summaryText = doc.splitTextToSize(resumeData.summary, 19);
    doc.setFont("times", "italic");
    doc.text(summaryText, 10.5, yOffset, { align: "center" });
    yOffset += summaryText.length * 0.5;
  }

  yOffset += 0.4;
  if (exists("education") && resumeData.education[0].title !== "") {
    doc.setFont("times", "bold");
    doc.text("EDUCATION", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    yOffset += 0.5;
    resumeData.education.forEach((education) => {
      doc.setFont("times", "bold");
      doc.text(`${education.degree}`, leftMargin, yOffset);
      doc.setFont("times", "normal");
      yOffset += 0.5;
      doc.text(`${education.institution}`, leftMargin, yOffset);
      yOffset += 0.5;

      // Building the explanation string flexibly
      let explanation = "";
      if (education.location) explanation += `${education.location}`;
      if (education.date) explanation += ` ${bulletPoint} ${education.date}`;
      if (education.minor)
        explanation += ` ${bulletPoint} Minor in ${education.minor}`;
      if (education.gpa) explanation += ` ${bulletPoint} ${education.gpa}`;

      if (explanation) {
        doc.text(explanation, leftMargin, yOffset);
        yOffset += 0.5;
      }

      if (education.extra && education.extra.length > 0) {
        education.extra.forEach((desc) => {
          const description = `${desc}`;
          if (description.trim() === "") {
            return; // Skip empty descriptions
          }
          const descText = doc.splitTextToSize(` ${bulletPoint} ${desc}`, 19);
          descText.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        });
        yOffset += 0.2;
      }
    });
  }

  if (exists("experience") && resumeData.experience[0].title !== "") {
    doc.setFont("times", "bold");

    doc.text("PROFESSIONAL EXPERIENCE", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    resumeData.experience.forEach((job) => {
      yOffset += 0.2;
      doc.setFont("times", "bold");
      if (job.position) {
        doc.text(`${job.position}`, leftMargin, yOffset);
      }
      if (job.start_date && job.end_date) {
        doc.text(`${job.start_date} - ${job.end_date}`, rightMargin, yOffset, {
          align: "right",
        });
      }

      doc.setFont("times", "normal");
      yOffset += 0.5;
      if (job.company) {
        doc.text(`${job.company}`, leftMargin, yOffset);
      }
      if (job.location) {
        doc.text(`${job.location}`, rightMargin, yOffset, {
          align: "right",
        });
      }
      yOffset += 0.5;

      if (job.description && job.description.length > 0) {
        job.description.forEach((desc) => {
          const description = `${desc}`;
          if (description.trim() === "") {
            return; // Skip empty descriptions
          }

          const descText = doc.splitTextToSize(
            ` ${bulletPoint} ${description}`,
            19
          );
          descText.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        });
      }
    });
  }

  yOffset += 0.4;

  if (exists("project") && resumeData.project[0].title !== "") {
    doc.setFont("times", "bold");
    doc.text("PROJECTS", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.4;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    resumeData.project.forEach((project) => {
      doc.setFont("times", "bold");
      if (project.title) {
        doc.text(`${project.title}`, leftMargin, yOffset);
      }
      if (project.start_date && project.end_date) {
        doc.text(
          `${project.start_date} - ${project.end_date}`,
          rightMargin,
          yOffset,
          { align: "right" }
        );
      }
      doc.setFont("times", "normal");
      yOffset += 0.5;

      for (const key in project) {
        if (key === "description" && Array.isArray(project[key])) {
          project[key].forEach((desc) => {
            const descText = doc.splitTextToSize(`${bulletPoint} ${desc}`, 19);
            descText.forEach((line) => {
              doc.text(line, leftMargin, yOffset);
              yOffset += 0.5;
            });
          });
        } else if (
          key === "title" ||
          key === "start_date" ||
          key === "end_date"
        ) {
          continue;
        } else if (Array.isArray(project[key])) {
          const upperKey = capitalizeFirstLetter(key);
          let text = `${upperKey}: `;
          project[key].forEach((item, index) => {
            text += item;
            if (index < project[key].length - 1) {
              text += ", ";
            }
          });
          const summaryText = doc.splitTextToSize(text, 19);
          summaryText.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        } else if (project[key]) {
          const upperKey = capitalizeFirstLetter(key);
          const extraText = `${upperKey}: ${project[key]}`;
          const extraTextLines = doc.splitTextToSize(extraText, 19);
          extraTextLines.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        }
      }
      yOffset += 0.1;
    });
  }
  yOffset += 0.2;
  if (
    exists("certification") &&
    resumeData.certification.length > 0 &&
    resumeData.certification[0].name !== ""
  ) {
    doc.setFont("times", "bold");
    doc.text("CERTIFICATION", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    resumeData.certification.forEach((cert) => {
      if (cert.name) {
        doc.setFont("times", "bold");
        doc.text(cert.name, leftMargin, yOffset);
        yOffset += 0.5;
        doc.setFont("times", "normal");
      }

      let info = "";
      if (cert.institution) info += `${cert.institution}`;
      if (cert.date) info += ` ${bulletPoint} ${cert.date}`;

      if (info.trim() !== "") {
        doc.text(info, leftMargin, yOffset);
        yOffset += 0.5;
      }

      if (cert.relevant && cert.relevant.length > 0) {
        cert.relevant.forEach((desc) => {
          const relevant = `${desc}`;
          if (relevant.trim() === "") {
            return; // Skip empty relevants
          }

          const descText = doc.splitTextToSize(
            ` ${bulletPoint} ${relevant}`,
            19
          );
          descText.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        });
      }
      yOffset += 0.2;
    });
  }

  if (
    exists("coursework") &&
    resumeData.coursework.length > 0 &&
    resumeData.coursework[0].title !== ""
  ) {
    doc.setFont("times", "bold");
    doc.text("COURSEWORK", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    console.log(resumeData.coursework);
    resumeData.coursework.forEach((course) => {
      if (course.title) {
        doc.setFont("times", "bold");
        doc.text(course.title, leftMargin, yOffset);
        yOffset += 0.5;
      }

      doc.setFont("times", "normal");
      let info = "";
      if (course.institution) info += `${course.institution}`;
      if (course.date) info += ` ${bulletPoint} ${course.date}`;

      if (info.trim() !== "") {
        doc.text(info, leftMargin, yOffset);
        yOffset += 0.5;
      }

      if (course.description && course.description.length > 0) {
        course.description.forEach((desc) => {
          const description = `${desc}`;
          if (description.trim() === "") {
            return; // Skip empty descriptions
          }

          const descText = doc.splitTextToSize(
            ` ${bulletPoint} ${description}`,
            19
          );
          descText.forEach((line) => {
            doc.text(line, leftMargin, yOffset);
            yOffset += 0.5;
          });
        });
      }
      yOffset += 0.2;
    });
  }

  if (
    exists("skill") &&
    resumeData.skill.length > 0 &&
    resumeData.skill[0].title !== ""
  ) {
    doc.setFont("times", "bold");
    doc.text("SKILLS", leftMargin, yOffset);
    yOffset += 0.2;
    doc.line(leftMargin, yOffset, rightMargin, yOffset);
    yOffset += 0.2;
    doc.setFont("times", "normal");
    yOffset += 0.2;

    resumeData.skill.forEach((skill) => {
      if (skill.type && skill.list && skill.list.length > 0) {
        let list = skill.list.filter((item) => item.trim() !== "").join(", ");
        if (list.trim() !== "") {
          let skillLine = `${skill.type}: ${list}`;
          doc.text(skillLine, leftMargin, yOffset);
          yOffset += 0.5;
        }
      }
    });
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
