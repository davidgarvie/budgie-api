import { getDBConnection } from "../../db";
import { Transaction } from "../../types";

export async function createTransactionFromRepository(data: Transaction) {
  const connection = await getDBConnection();
  const database = connection.db("budgie");
  const collection = database.collection<Transaction>("transactions");
  const result = await collection.insertOne(data);
  const document = await collection.findOne({ _id: result.insertedId });
  return document;
}
