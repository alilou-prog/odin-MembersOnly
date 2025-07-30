#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const DB_URL = process.env.DB_URL;

const seed_SQL = `
INSERT INTO "Message" (title, text, user_id) VALUES
  ('Meeting Reminder', 'Don not forget our meeting at 3 PM today.', 2),
  ('Project Update', 'The frontend team finished the login page.', 2),
  ('Bug Report', 'There is a display issue on mobile devices.', 2);
`;


async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(seed_SQL);
  await client.end();
  console.log("done");
}

main();
