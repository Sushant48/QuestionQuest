import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your backend URL
  timeout: 3000,
});

export default instance;
