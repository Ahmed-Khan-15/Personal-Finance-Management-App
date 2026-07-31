import api from "../api/axios";

export async function getRecurringTransactions(filter) {

    const response = await api.get("/recurring_transactions");

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

export async function deleteRecurringTransactions(recurringTransactionIds) {

    const response = await api.delete("/recurring_transactions", {
        data: {
            recurringTransactionIds
        }
    });

    return response.data;

};