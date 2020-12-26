const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());



//Routes

//Add a user

app.post("/moneygoose", async(req, res) => {
    try {
        const [username, password, dob, gender, nid, oid, eid] = req.body;
        const newUser = await pool.query("INSERT INTO user(username, password, dob, gender, nid, oid, eid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [username, password, dob, gender, nid, oid, eid]);
        res.json(newUser.rows[0]);
    } catch (error) {
            console.error(error.message);
    }
    
})

//delete a user

app.delete("/moneygoose/:uid", async(req, res) => {
    try {
        const [ uid ] = req.params
        const deleteUser = await pool.query("DELETE FROM user WHERE uid = $1 RETURNING *", [uid]);
        res.json(deleteUser.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//edit user details

app.put("/moneygoose/:uid", async(req,res) => {
    try {
        const [ uid ] = req.params;
        const [ nid, oid, eid ] = req.body;
        const updateUser = await pool.query("UPDATE user SET nid = $1, oid = $2, eid = $3 WHERE uid = $4 RETURNING *", [nid, oid, eid, uid]);
        res.json(updateUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//view all users

app.get("/moneygoose", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view details of a user

app.get("/moneygoose/:uid", async(req, res) => {
    try {
        const [ uid ] = req.params;
        const getUserDetails = await pool.query("SELECT * FROM user WHERE uid = $1", [uid]);
        res.json(getUserDetails.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//add a spending

app.post("/moneygoose/:uid", async(req, res) => {
    try {
        const [ uid ] = req.params;
        const [ descrption, dateTime, scid] = req.body;
        const addSpending = await pool.query("INSERT INTO userSpending(uid, description, dateTime, scid) VALUES ($1, $2, $3, $4) RETURNING *", [uid, descrption, dateTime, scid]);
        res.json(addSpending.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//view all spendings

app.get("/moneygoose/spending", async(req, res) => {
    try {
        const allSpendings = await pool.query("SELECT * FROM userSpending");
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view spendings by a user

app.get("/moneygoose/spending/:uid", async(req, res) => {
    try {
        const [ uid ] = req.params;
        const allSpendings = await pool.query("SELECT * FROM userSpending WHERE uid = $1", [uid]);
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view spendings by a user by day (a particular date)

app.get("/moneygoose/spending/day/:uid&:year&:month&:day", async(req, res) => {
    try {
        const [ uid, month, year, day ] = req.params;
        const allSpendings = await pool.query("SELECT * FROM userSpending WHERE uid = $1 AND YEAR(dateTime) = $2 AND MONTH(dateTime) = $3 AND DAY(dateTime) = $4 ", [uid, year, month, day]);
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view spendings by a user by week (1-4)

app.get("/moneygoose/spending/week/:uid&:year&:month", async(req, res) => {
    try {
        const [ uid, month, year ] = req.params;
        const allSpendings = await pool.query("SELECT * FROM userSpending WHERE uid = $1 AND YEAR(dateTime) = $2 AND MONTH(dateTime) = $3 GROUP BY DATEPART(wk, dateTime)", [uid, year, month]);
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view spendings by a user by month

app.get("/moneygoose/spending/month/:uid&:year&:month", async(req, res) => {
    try {
        const [ uid, month, year ] = req.params;
        const allSpendings = await pool.query("SELECT * FROM userSpending WHERE uid = $1 AND YEAR(dateTime) = $2 AND MONTH(dateTime) = $3 ORDER BY dateTime ASC", [uid, year, month]);
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//view spendings by a user by year

app.get("/moneygoose/spending/year/:uid&:year", async(req, res) => {
    try {
        const [ uid, year ] = req.params;
        const allSpendings = await pool.query("SELECT * FROM userSpending WHERE uid = $1 AND YEAR(dateTime) = $2 ORDER BY dateTime ASC", [uid, year]);
        res.json(allSpendings.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//edit a spending 

app.put("/moneygoose/spending/:sid", async(req,res) => {
    try {
        const [ sid ] = req.params;
        const [ description, dateTime, scid] = req.body;
        const editSpending = await pool.query("UPDATE userSpending SET description = $1, dateTime = $2, scid = $3 WHERE sid = $4 RETURNING *", [description, dateTime, scid, sid]);
        res.json(editSpending.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//delete a spending

app.delete("/moneygoose/spending/:sid", async(req,res) => {
    try {
        const [ sid ] = req.params;
        const deleteSpending = await pool.query("DELETE FROM userSpending WHERE sid = $1 RETURNING *", [sid]);
        res.json(deleteSpending.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get all nationalities



app.get("/moneygoose/nationality/get", async(req, res) => {
    try {
        const allNationalites = await pool.query("SELECT * FROM nationality");
        res.json(allNationalites.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get all occupations

app.get("/moneygoose/occupation/get", async(req, res) => {
    try {
        const occupations = await pool.query("SELECT * FROM occupation");
        res.json(occupations.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get all educations

app.get("/moneygoose/education/get", async(req, res) => {
    try {
        const educations = await pool.query("SELECT * FROM education");
        res.json(educations.rows);
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(5000, () => {
    console.log("server has started on Port 5000")
});