// pages/index.js
"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    // Dynamically load the pdf.js script
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib = window.pdfjsLib || window["pdfjs-dist/build/pdf"];
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js";
    };
    document.body.appendChild(script);
  }, []);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();

      // Load PDF with pdf.js
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        textContent.items.forEach((item) => {
          text += item.str + " ";
        });
      }

      setExtractedText(text);
      console.log(text);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  };

  return (
    <div>
      <h1>Upload PDF to Extract Text</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <h2>Extracted Text:</h2>
        <pre>{extractedText}</pre>
      </div>
    </div>
  );
}
