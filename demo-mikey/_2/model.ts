import { Client } from "https://deno.land/x/postgres/mod.ts";

async function main() {
  const client = new Client({
    user: "user",
    database: "test",
    hostname: "localhost",
    port: 5432
  });
  await client.connect();
  const result = await client.query("SELECT * FROM people;");
  console.log(result.rows);
  await client.end();
}

main();