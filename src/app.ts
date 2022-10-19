import { json } from "body-parser";
import { errors } from "celebrate";
import express from "express";
import morgan from "morgan";
import { transactionRouter } from "./transactions/router";

export const app = express();

app.use(morgan("dev", { skip: () => process.env.NODE_ENV === "test" }));
app.use(json());
app.get("/ping", (req, res) => res.send("pong"));
app.use("/transactions", transactionRouter);
app.use(errors());
