import api from "../api/axios";

export async function getTransactions(filter) {

    const response = await api.get("/transactions", {
        params: {
            filter
        }
    });

    return response.data

};

export default getTransactions;