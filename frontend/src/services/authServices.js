import api from "../api/axios";

export async function login({
    email,
    password
}){

    const response = await api.post("/auth/login", {
        email,
        password
    });

    return response.data

};

export async function signup({
    username,
    email,
    password
}){

    const response = await api.post("/auth/signup", {
        username,
        email,
        password
    });

    return response.data

};

export function logout (){
    localStorage.removeItem("token");
};

 