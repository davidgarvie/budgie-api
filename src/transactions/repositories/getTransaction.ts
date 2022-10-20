import { ObjectId } from "mongodb";
import { getTransactionsCollection } from "../../db";
import { Transaction } from "../../types";

export async function getTransactionFromRepository(
  id: string
): Promise<Transaction | null> {
  const collection = getTransactionsCollection();

  const objectId = new ObjectId(id);

  const document = await collection.findOne<Transaction>({ _id: objectId });
  return document;
}
