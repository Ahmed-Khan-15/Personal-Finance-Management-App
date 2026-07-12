require("dotenv").config();
const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();


app.use(express.json());


const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Welcome to personal finance manager api!")
})

app.use("/transactions", transactionRoutes );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
)


app.use("/auth", authRoutes);


