const getTransactions = (req, res) => {
    res.json([{
        id: 1,
        type: "income",
        category: "salary",
        amount: 100
    },
    {
        id: 2,
        type: "income",
        category: "commision",
        amount: 25
    }]);
};

const createTransaction = (req, res) => {
    const { type, category, amount, description } = req.body;

    res.status(201).json({

        "message": "Transaction created successfully!",
        "transaction": {
            type,
            category,
            amount,
            description
        }
    });
};

const getTransactionById = (req,res)=>{
    const { id } = Number(req.params);

    if(Number.isNaN(id)){
        return res.status(400).json({
            message: "Invalid transaction ID"
        });
    }

    res.json({
        id,
        type: "expense",
        categor: "Food",
        amount: 500
    });
    
};

module.exports = {
    getTransactions,
    createTransaction,
    getTransactionById
};