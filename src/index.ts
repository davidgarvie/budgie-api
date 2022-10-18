import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
