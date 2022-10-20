import { ObjectId } from "mongodb";
import { Transaction } from "./types";
import { createDBConnection, getDBConnection } from "./db";

export async function seedData(): Promise<{ [key: number]: ObjectId }> {
  const connection = await createDBConnection();
  const database = connection.db("budgie");
  const collection = database.collection<Transaction>("transactions");

  const result = await collection.insertMany([
    { description: "Coffee" },
    { description: "Pastry" },
  ]);

  connection.close();
  return result.insertedIds;
}

export async function insertRecord(): Promise<string> {
  const connection = await getDBConnection();
  const database = connection.db("budgie");
  const collection = database.collection<Transaction>("transactions");

  const result = await collection.insertOne({
    description: "Hawaiin Pizza",
  });
  return result.insertedId.toString();
}
