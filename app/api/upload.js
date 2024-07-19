import nextConnect from "next-connect";
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  const pdfBuffer = fs.readFileSync(
    `./public/uploads/${req.file.originalname}`
  );
  const data = await pdfParse(pdfBuffer);

  res.status(200).json({ text: data.text });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
