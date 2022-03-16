process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb");

let item = {
  name: "silly item",
  price: 200,
};

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

// GET /items - returns {items: [item, ...]}
describe("GET /items", async function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get("/items");
    const { items } = resp.body;
    expect(resp.statusCode).toBe(200);
  });
});

// GET /items[name] - returns data about one item: `{item: item}

describe("GET /items/:name", async function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item).toEqual(item);
  });
  //   if item cannot be found
  test("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

/** POST /items - create item from data; return `{item: item}` */
