const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load .env file variables

const app = express();

// Setup to parse JSON data
app.use(express.json());

// Setup database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Listen to the server
const PORT = 3307;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// question 1
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while retrieving patients');
      }
      res.json(results);
    });
  });
  
//   question 2
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while retrieving providers');
      }
      res.json(results);
    });
  });

// question 3
app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while filtering patients');
      }
      res.json(results);
    });
  });

//   question 4
app.get('/providers/specialty', (req, res) => {
    const { specialty } = req.query;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred while retrieving providers by specialty');
      }
      res.json(results);
    });
  });
  