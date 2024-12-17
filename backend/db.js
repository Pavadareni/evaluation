const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'employee_management',
    port: '3306'
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('connected');
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
