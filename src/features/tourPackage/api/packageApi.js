import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:5000/api/packages";

export const getPackageById = (id) => axios.get(`${API_URL}/${id}`);
export const updatePackage = (id, data) => api.put(`${API_URL}/${id}`, data);
export const createPackage = (data) => api.post(API_URL, data);
