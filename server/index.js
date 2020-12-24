const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());



//Routes



app.listen(5000, () => {
    console.log("server has started on Port 5000")
});