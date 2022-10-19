import { getDBConnection } from "../../db";
import { Transaction } from "../../types";

export async function getTransactionsFromRepository(): Promise<Transaction[]> {
  const connection = await getDBConnection();
  const database = connection.db("budgie");
  const collection = database.collection<Transaction>("transactions");
  const documents = await collection.find<Transaction>({}).toArray();
  return documents;
}
