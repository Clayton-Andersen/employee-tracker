const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'NewPassword',
  database: 'empTracker'
});

connection.connect( (error) => {
    if(error) throw error;
})

module.exports = connection;