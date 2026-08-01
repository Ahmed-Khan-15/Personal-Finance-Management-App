import api from "../api/axios";

export async function getTransactions(filter) {

    const response = await api.get("/transactions", {
        params: {
            filter
        }
    });

    return response.data

};

export async function getTransactionById( id ) {

    const response = await api.get(`/transactions/${id}`);

    return response.data

};

export async function postTransaction({
    category_id,
    recurring_transaction_id,
    description,
    amount,
    transaction_type,
    transaction_date

}) {

    const response = await api.post("/transactions", {
        category_id,
        recurring_transaction_id,
        description,
        amount,
        transaction_type,
        transaction_date
    });

    return response.data

};

export async function updateTransaction(id,data) {
    
    const response = await api.put(`/transactions/${id}`,{
        category_id: data.category_id,
        description: data.description,
        amount: data.amount,
        transaction_type: data.transaction_type,
        transaction_date: data.transaction_date,
        recurring_transaction_id: data.recurring_transaction_id
    });

    return response.data;

};

export async function deleteTransactions(transactionIds) {

    const response = await api.delete("/transactions", {
        data: {
            transactionIds
        }
    });

    return response.data;

};