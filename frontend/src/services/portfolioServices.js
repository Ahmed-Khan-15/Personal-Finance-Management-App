import api from "../api/axios";

export async function getPortfolio(filter) {

    const response = await api.get("/portfolio", {
        params: {
            filter
        }
    });

    return response.data

};

export default getPortfolio;