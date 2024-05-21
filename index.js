import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server is running",
  });
});

app.listen(port, () => {
  console.log("server is running on port:", port);
});
