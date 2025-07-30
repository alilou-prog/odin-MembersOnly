#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const DB_URL = process.env.DB_URL;

const reset_SQL = `
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Message";
`

const model_SQL = `
CREATE TABLE IF NOT EXISTS "User" (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  is_admin VARCHAR ( 255 ),
  is_member BOOLEAN DEFAULT FALSE,
  password VARCHAR ( 255 ),
  salt VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS "Message" (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  text VARCHAR ( 255 ),
  user_id INTEGER,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // user: process.env.DB_USER,
    connectionString: DB_URL,
  });
  await client.connect();
  await client.query(reset_SQL);
  await client.query(model_SQL);
  await client.end();
  console.log("done");
}

main();
