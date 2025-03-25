// To run this test, the project should NOT be running/executing.

import request from "supertest";
import server from "../server.js"; 

describe("Authentication Routes", () => {
    it("should return an error for invalid login", async () => {
      const res = await request(server).post("/auth/login").send({
        username: "wrongUser",
        password: "wrongPass",
        action: "login"
      });  
      expect(res.statusCode).toBe(200); 
      expect(res.text).toContain("User does not exist.");
    });
  });