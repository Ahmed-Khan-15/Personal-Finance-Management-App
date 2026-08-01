import api from "../api/axios";

export async function getCategories() {

    const response = await api.get("/categories");

    return response.data

};

export async function postCategory({ name }) {

    const response = await api.post("/categories",{
        name
    });

    return response.data

};

export async function deleteCategories() {

    const response = await api.delete("/categories");

    return response.data;

};