import api from "../api/axios";

export async function getPortfolio() {

    const response = await api.get("/portfolio");

    return response.data

};

export default getPortfolio;