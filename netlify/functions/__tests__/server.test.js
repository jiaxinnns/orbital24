const request = require("supertest");
import { server } from "../server";

const supabase = require("../supabaseClient");

jest.mock("../supabaseClient");

describe("GET /api/getlogs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return logs for a given user ID", async () => {
    const mockData = [
      {
        id: 17,
        user_id: "53b56ae6-6787-4d7a-83d3-061034d6e237",
        created_at: "2024-07-10T06:34:52.288+00:00",
        duration: 3,
        ended_at: "2024-07-10T06:34:52.288+00:00",
        user_name: "isaac",
      },
    ];
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      gte: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    const response = await request(server)
      .get("/api/getlogs")
      .query({ user_id: "53b56ae6-6787-4d7a-83d3-061034d6e237" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should return a 500 error if supabase query fails", async () => {
    const mockError = new Error("Supabase error");
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      gte: jest.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    const response = await request(server)
      .get("/api/getlogs")
      .query({ user_id: "843290" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'invalid input syntax for type uuid: "843290"',
    });
  });
});

describe("GET /api/getmessages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return messages for a given chat ID", async () => {
    const mockData = [
      {
        chat_id:
          "53b56ae6-6787-4d7a-83d3-061034d6e237-9440feb8-5905-442c-ab91-f5860e1b8e6a",
        id: "280099ff-15da-43ff-a863-c719f454faa7",
        message: "hello",
        sender_id: "9440feb8-5905-442c-ab91-f5860e1b8e6a",
        sender_name: "jasmine",
        timestamp: "2024-07-01T05:50:55.882",
      },
      {
        chat_id:
          "53b56ae6-6787-4d7a-83d3-061034d6e237-9440feb8-5905-442c-ab91-f5860e1b8e6a",
        id: "c6ee3961-8c57-412f-8229-ef5eba61810d",
        message: "hello",
        sender_id: "53b56ae6-6787-4d7a-83d3-061034d6e237",
        sender_name: "isaac",
        timestamp: "2024-07-07T14:33:10.901",
      },
    ];
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    const response = await request(server).get("/api/getmessages").query({
      chat_id:
        "53b56ae6-6787-4d7a-83d3-061034d6e237-9440feb8-5905-442c-ab91-f5860e1b8e6a",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });
});
