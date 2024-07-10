"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../nav";

export default function Certification() {
  const storedCertification = localStorage.getItem("certification");
  const initialCertification = storedCertification
    ? JSON.parse(storedCertification).map((cert) => ({
        ...cert,
        relevant: Array.isArray(cert.relevant)
          ? cert.relevant
          : [cert.relevant],
      }))
    : [
        {
          name: "",
          institution: "",
          date: "",
          relevant: [""],
        },
      ];

  const [certification, setCertification] = useState(initialCertification);

  useEffect(() => {
    localStorage.setItem("certification", JSON.stringify(certification));
  }, [certification]);

  const handleChange = (index, e) => {
    const updatedCertification = [...certification];
    updatedCertification[index][e.target.name] = e.target.value;
    setCertification(updatedCertification);
  };

  const handleRelevantChange = (certIndex, relevantIndex, e) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant[relevantIndex] = e.target.value;
    setCertification(updatedCertification);
  };

  const addRelevant = (certIndex) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant.push("");
    setCertification(updatedCertification);
  };

  const deleteRelevant = (certIndex, relevantIndex) => {
    const updatedCertification = [...certification];
    updatedCertification[certIndex].relevant = updatedCertification[
      certIndex
    ].relevant.filter((_, i) => i !== relevantIndex);
    if (updatedCertification[certIndex].relevant.length === 0) {
      updatedCertification[certIndex].relevant.push("");
    }
    setCertification(updatedCertification);
  };

  const addCertification = () => {
    setCertification([
      ...certification,
      { name: "", institution: "", date: "", relevant: [""] },
    ]);
  };

  const deleteCertification = (index) => {
    const updatedCertification = certification.filter((_, i) => i !== index);
    if (updatedCertification.length === 0) {
      updatedCertification.push({
        name: "",
        institution: "",
        date: "",
        relevant: [""],
      });
    }
    setCertification(updatedCertification);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("certification", JSON.stringify(certification));
    alert("Saved!");
    console.log(certification);
  };

  return (
    <div>
      <Navbar activepath="/create/certification" />
      <div style={{ display: "flex" }}>
        {certification.length > 0 && certification[0].name !== "" ? (
          <div className="container">
            {certification.map((cert, index) =>
              cert.name.length !== 0 ? (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    {cert.name}
                  </label>
                  <button
                    type="button"
                    className="button"
                    onClick={() => deleteCertification(index)}
                  >
                    Delete Certification
                  </button>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="container">
          <form onSubmit={handleSubmit}>
            {certification.map((cert, index) => (
              <div key={index}>
                <label htmlFor={`name-${index}`}>Certification Name:</label>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={cert.name}
                  onChange={(e) => handleChange(index, e)}
                />

                <label htmlFor={`institution-${index}`}>Institution:</label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  name="institution"
                  value={cert.institution}
                  onChange={(e) => handleChange(index, e)}
                />

                <label htmlFor={`date-${index}`}>Date:</label>
                <input
                  type="text"
                  id={`date-${index}`}
                  name="date"
                  value={cert.date}
                  onChange={(e) => handleChange(index, e)}
                />

                <label className="label">Relevant Information:</label>
                {cert.relevant.map((relevant, relevantIndex) => (
                  <div
                    key={relevantIndex}
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      name={`relevant-${relevantIndex}`}
                      value={relevant}
                      onChange={(e) =>
                        handleRelevantChange(index, relevantIndex, e)
                      }
                      className="input"
                      style={{ flex: 1, marginRight: "0.5rem" }}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() => deleteRelevant(index, relevantIndex)}
                      style={{ height: "45px", marginTop: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="button"
                  onClick={() => addRelevant(index)}
                  style={{ marginLeft: 0, marginBottom: "3rem" }}
                >
                  Add Relevant
                </button>
                <br />
              </div>
            ))}
            <div className="buttonContainer">
              <button
                type="button"
                onClick={addCertification}
                className="button"
              >
                Add Certification
              </button>
              <button type="submit" className="button">
                Save
              </button>
              <Link href="/create/coursework">
                <button type="submit" className="button">
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}
