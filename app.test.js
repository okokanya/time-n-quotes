import server from "./app";
import supertest from "supertest";
const request = supertest(server);

describe("Sever answers", () => {
  it("GET / should show main page", async () => {
    const res = await request.get("/");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("html"));
  });

  it("GET /api?time=1600 should show a quote with time", async () => {
    const res = await request.get("/api?time=1600");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("data");
  });

  it("GET /something should return 404", async () => {
    const res = await request.get("/something");
    expect(res.statusCode).toEqual(404);
  });
});
