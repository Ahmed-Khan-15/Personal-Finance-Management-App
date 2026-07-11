require("dotenv").config();
const express = require("express");

const app = express();

const pool = require("./config/db");

app.use(express.json());

const transactionRoutes = require("./routes/transactionRoutes");

const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Welcome to personal finance manager api!")
})

app.use("/transactions", transactionRoutes );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
)

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);


