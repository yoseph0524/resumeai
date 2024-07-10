from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import PyPDF2
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Set up the NLP model
model_name = "bert-base-uncased"
nlp = pipeline("fill-mask", model=model_name)


# File upload route
@app.route("/upload", methods=["POST", "GET"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    filename = secure_filename(file.filename)
    file.save(os.path.join("/tmp", filename))
    file_path = os.path.join("/tmp", filename)

    # Extract text from the uploaded PDF
    text = extract_text_from_pdf(file_path)

    return jsonify({"text": text})


def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    return text


if __name__ == "__main__":
    app.run(debug=True)
