import { Request, Response } from "express";

export async function getTransactionController(
  req: Request,
  res: Response
): Promise<Response> {
  const transaction = res.locals.resource;
  return res.json(transaction);
}
