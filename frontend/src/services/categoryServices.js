import api from "../api/axios";

export async function getCategories() {

    const response = await api.get("/categories", {
        params: {
            filter
        }
    });

    return response.data

};

export async function deleteCategories() {

    const response = await api.delete("/categories");

    return response.data;

};