import api from "../api/axios";

export async function getRecurringTransactions() {

    const response = await api.get("/recurring_transactions");

    return response.data

};

export async function getRecurringTransactionById( id ) {

    const response = await api.get(`/recurring_transactions/${id}`);

    return response.data

};

export async function postRecurringTransaction({
        category_id,
        repeat_interval,
        description,
        amount,
        transaction_type,
        start_date,
        end_date
    }) {

    const response = await api.post("/recurring_transactions", {
        category_id,
        repeat_interval,
        description,
        amount,
        transaction_type,
        start_date,
        end_date
    });


    return response.data

};

export async function updateRecurringTransaction(id,data) {
    
    const response = await api.put(`/recurring_transactions/${id}`,{
        category_id: data.category_id,
        repeat_interval: data.repeat_interval,
        description: data.description,
        amount: data.amount,
        transaction_type: data.transaction_type,
        start_date: data.start_date,
        end_date: data.end_date
    });

    return response.data;

};

export async function deleteRecurringTransactions(recurringTransactionIds) {

    const response = await api.delete("/recurring_transactions", {
        data: {
            recurringTransactionIds
        }
    });

    return response.data;

};

