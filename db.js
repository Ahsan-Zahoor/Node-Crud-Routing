const { Client } = require("pg");

const client = new Client({
  user: "postgres", // Your PostgreSQL username
  host: "localhost", // Your PostgreSQL server's host (e.g., localhost)
  database: "firstproject", // Your PostgreSQL database name
  password: "my136425", // Your PostgreSQL password
  port: 5432, // Your PostgreSQL server's port (default is 5432)
});

client.connect();

client.query("SELECT * FROM users", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(row);
  }
  client.end();
});
