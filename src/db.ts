import { MongoClient } from "mongodb";

let connection: MongoClient;

export async function createDBConnection() {
  try {
    const client = new MongoClient(process.env.MONGO_URI as string);
    connection = await client.connect();
    return connection;
  } catch (e) {
    console.error(
      "Unable to connect to Mongo database. Please verify connection string."
    );
    process.exit(1);
  }
}

export function getDBConnection() {
  return connection;
}

export async function closeDBConnection() {
  await connection.close();
}
