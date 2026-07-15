require("dotenv").config();
const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

const PORT = 3000;

app.use("/transactions", transactionRoutes );
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to personal finance manager api!")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
)

