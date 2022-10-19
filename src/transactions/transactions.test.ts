import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";

import { closeDBConnection, createDBConnection } from "../db";
import { Transaction } from "../types";

async function seedData() {
  const connection = await createDBConnection();
  const database = connection.db("budgie");
  const collection = database.collection<Transaction>("transactions");

  const result = await collection.insertMany([
    { description: "Coffee" },
    { description: "Pastry" },
  ]);

  connection.close();
}

describe("transaction router", () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongod.getUri();
    await seedData();
    await createDBConnection();
  });

  afterAll(async () => {
    await closeDBConnection();
    await mongod.stop();
  });

  it("can get a list of transactions", async () => {
    const response = await request(app).get("/transactions").expect(200);
    const [transaction1, transaction2] = response.body;
    expect(transaction1.description).toBe("Coffee");
    expect(transaction2.description).toBe("Pastry");
  });

  it("can create a transaction", async () => {
    const response = await request(app)
      .post("/transactions")
      .send({ description: "Lunch" })
      .expect(201);
    const transaction = response.body;
    expect(transaction.description).toBe("Lunch");
  });

  it("does not create a transaction with unexpected data", async () => {
    const response = await request(app)
      .post("/transactions")
      .send({ foo: "bar" })
      .expect(400);
  });
});
