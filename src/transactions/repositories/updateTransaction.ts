import { ObjectId } from "mongodb";
import { getTransactionsCollection } from "../../db";
import { Transaction } from "../../types";

export async function updateTransactionFromRepository(
  id: string,
  data: Transaction
): Promise<Transaction | null> {
  const collection = getTransactionsCollection();

  const objectId = new ObjectId(id);
  const result = await collection.findOneAndUpdate(
    { _id: objectId },
    {
      $set: data,
    },
    {
      returnDocument: "after",
    }
  );

  return result.value;
}
