// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://10.14.237.130:8001/api",
// });

// export default api;


// src/API/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.14.237.130:8001/api",  // Dev
    // baseURL: "https://10.14.237.130:3000/api", // QA
    // baseURL: "/api",


    timeout: 10000, // Contoh timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk request
api.interceptors.request.use((config) => {
    console.log("Request config:", config);
    // Anda bisa menambahkan logic di sini, misalnya menambahkan token otorisasi
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, (error) => {
    // Tangani error request
    return Promise.reject(error);
});

// Interceptor untuk response
api.interceptors.response.use((response) => {
    console.log("Response data:", response);
    return response;
}, (error) => {
    console.error("Response error:", error);
    // Tangani error response (misalnya, redirect jika 401 Unauthorized)
    // if (error.response && error.response.status === 401) {
    //     // Lakukan sesuatu, misalnya redirect ke halaman login
    // }
    return Promise.reject(error);
});

export default api;
