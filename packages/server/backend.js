import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/secretPage', (req, res) => {
  const secretData = { message: 'This is a secret message!' };
  res.json(secretData);
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default { app, server };