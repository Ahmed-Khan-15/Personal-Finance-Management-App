const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;

pool.connect()
    .then(()=>{
        console.log("connected to postgresql");
    })
    .catch((err)=>{
        console.error("database connection failed");
        console.error(err);
    })