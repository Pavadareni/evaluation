const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});


app.post("/", (req, res) => {
    const { name, employeeId, email, phone, department, joiningDate, role } = req.body;

    const checkQuery = `SELECT * FROM employees WHERE employee_id = ? OR email = ?`;
    db.query(checkQuery, [employeeId, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Database error." });
        }
        if (result.length > 0) {
            return res.json({ success: false, message: "Employee already exists." });
        }

        const query = `INSERT INTO employees (name, employee_id, email, phone, department, joining_date, role) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        db.query(
            query,
            [name, employeeId, email, phone, department, joiningDate, role],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: "Database error." });
                }
                res.json({ success: true, message: "Employee added successfully." });
            }
        );
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});