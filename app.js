const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7606837',
  password: 'PLqpdGG79Z',
  database: 'sql7606837'
});

connection.connect(function(error) {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

app.post('/login', function(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userIpAddress = req.body.ip;
  console.log("requested");
  console.log(userEmail);
  console.log(userPassword);
  console.log(userIpAddress);

  // Query the SQL database to check if the user's email is stored and if the IP address is null
  const query = `SELECT * FROM Login WHERE gmail = '${userEmail}' AND (ip IS NULL OR ip = '${userIpAddress}')`;
  connection.query(query, function(error, results, fields) {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    } else if (results.length > 0 && results[0].password === userPassword && results[0].ip !== null) {
      // The user's email and IP address are stored in the database, and the password matches
      res.json({ success: true });
      console.log("success ip found too");
    } else if (results.length > 0 && results[0].ip === null) {
      // The user's email is stored in the database, but the IP address is null
      const updateQuery = `UPDATE Login SET ip='${userIpAddress}' WHERE gmail='${userEmail}'`;
      connection.query(updateQuery, function(error, results, fields) {
        if (error) {
          console.error('Error updating database:', error);
          res.status(500).json({ success: false, error: 'Internal server error' });
        } else {
          res.json({ success: true });
          console.log("success, ip added to database");
        }
      });
    } else {
      // The user's email and/or IP address is not stored in the database, or the password is incorrect
      res.json({ success: false });
      console.log("false");
    }
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
