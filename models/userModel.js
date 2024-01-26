const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "firstproject",
  password: "my136425", // Change this to your actual password
  port: 5432,
});

class UserModel {
  async createUserTable() {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phonenumber VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE (email),
          UNIQUE (phonenumber),
          UNIQUE (username)
        );
      `);
      console.log("User table created successfully");
    } finally {
      client.release();
    }
  }

  async seedData() {
    const client = await pool.connect();

    try {
      // Check if there are any users in the table
      const checkQuery = "SELECT COUNT(*) FROM users;";
      const checkResult = await client.query(checkQuery);

      if (parseInt(checkResult.rows[0].count) === 0) {
        // Insert seed data if the users table is empty
        const seedDataQuery = `
          INSERT INTO users (username, email, phonenumber, password)
          VALUES
            ('john_doe', 'john@example.com', '1234567890', 'password123'),
            ('jane_doe', 'jane@example.com', '9876543210', 'secret123');
        `;
        await client.query(seedDataQuery);

        console.log("Seed data inserted successfully");
      } else {
        console.log("Users table already has data. Skipping seed data.");
      }
    } finally {
      client.release();
    }
  }

  async createUser(userData) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO users (username, email, phonenumber, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [
        userData.username,
        userData.email,
        userData.phonenumber,
        userData.password,
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getAllUsers() {
    console.log("in get users");
    const client = await pool.connect();
    try {
      const query = "SELECT * FROM users;";
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getUserById(userId) {
    const client = await pool.connect();
    try {
      const query = "SELECT * FROM users WHERE id = $1;";
      const values = [userId];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateUser(userId, userData) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE users
        SET username = $1, email = $2, phonenumber = $3, password = $4, updated_at = NOW()
        WHERE id = $5
        RETURNING *;
      `;
      const values = [
        userData.username,
        userData.email,
        userData.phonenumber,
        userData.password,
        userId,
      ];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteUser(userId) {
    const client = await pool.connect();
    try {
      const query = "DELETE FROM users WHERE id = $1 RETURNING *;";
      const values = [userId];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = new UserModel();
