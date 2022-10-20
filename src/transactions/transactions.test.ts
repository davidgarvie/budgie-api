import request from "supertest";
import { ObjectId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import { app } from "../app";
import { closeDBConnection, createDBConnection } from "../db";
import { seedData, insertRecord } from "../testUtilities";

describe("transaction router", () => {
  let mongod: MongoMemoryServer;
  let createdIds: { [key: number]: ObjectId };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongod.getUri();
    createdIds = await seedData();
    await createDBConnection();
  });

  afterAll(async () => {
    await closeDBConnection();
    await mongod.stop();
  });

  describe("GET /", () => {
    it("returns a list of transactions", async () => {
      const response = await request(app).get("/transactions").expect(200);
      const [transaction1, transaction2] = response.body;
      expect(transaction1.description).toBe("Coffee");
      expect(transaction2.description).toBe("Pastry");
    });
  });

  describe("POST /", () => {
    it("creates a transaction", async () => {
      const response = await request(app)
        .post("/transactions")
        .send({ description: "Lunch" })
        .expect(201);
      const transaction = response.body;
      expect(transaction.description).toBe("Lunch");
    });

    it("does not create a transaction with unexpected data", async () => {
      await request(app).post("/transactions").send({ foo: "bar" }).expect(400);
    });
  });

  describe("GET /:id", () => {
    it("returns a specific transasction", async () => {
      const transactionId = createdIds[0].toString();
      const response = await request(app)
        .get(`/transactions/${transactionId}`)
        .expect(200);
      expect(response.body.description).toEqual("Coffee");
    });

    it("returns a 404 if it cannot find a specific transasction", async () => {
      const transactionId = new ObjectId(1);
      await request(app).get(`/transactions/${transactionId}`).expect(404);
      await request(app).get(`/transactions/1234`).expect(404);
    });
  });

  describe("PUT /:id", () => {
    it("can update a transaction", async () => {
      const id = await insertRecord();

      const response = await request(app)
        .put(`/transactions/${id}`)
        .send({ description: "Margherita Pizza" })
        .expect(200);

      const transaction = response.body;
      expect(transaction.description).toBe("Margherita Pizza");
    });

    it("does not update a transaction with unexpected data", async () => {
      const id = await insertRecord();

      await request(app)
        .put(`/transactions/${id}`)
        .send({ foo: "bar" })
        .expect(400);
    });

    it("returns a 404 for a transaction which does not exist", async () => {
      const id = new ObjectId(1);

      await request(app)
        .put(`/transactions/${id}`)
        .send({ foo: "bar" })
        .expect(404);
    });
  });

  describe("DELETE /:id", () => {
    it("can delete a transaction", async () => {
      const id = await insertRecord();

      await request(app).delete(`/transactions/${id}`).expect(204);
    });

    it("returns a 404 for a transaction which does not exist", async () => {
      const id = new ObjectId(1);

      await request(app).delete(`/transactions/${id}`).expect(404);
    });
  });
});
