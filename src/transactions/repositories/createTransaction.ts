import { getTransactionsCollection } from "../../db";
import { Transaction } from "../../types";

export async function createTransactionFromRepository(data: Transaction) {
  const collection = getTransactionsCollection();
  const result = await collection.insertOne(data);
  const document = await collection.findOne({ _id: result.insertedId });
  return document;
}
