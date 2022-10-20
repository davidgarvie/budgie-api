import { ObjectId } from "mongodb";
import { getTransactionsCollection } from "../../db";

export async function deleteTransactionFromRepository(
  id: string
): Promise<boolean> {
  const collection = getTransactionsCollection();

  const objectId = new ObjectId(id);
  const result = await collection.deleteOne({ _id: objectId });
  return result.acknowledged;
}
