import { getTransactionsCollection } from "../../db";
import { Transaction } from "../../types";

export async function getTransactionsFromRepository(): Promise<Transaction[]> {
  const collection = getTransactionsCollection();
  const documents = await collection.find<Transaction>({}).toArray();
  return documents;
}
