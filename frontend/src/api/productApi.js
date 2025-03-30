import axios from "axios";
import { get } from "mongoose";

const API_BASE_URL = 
    window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : `http://${window.location.hostname}:5000`;

const API_URL = `${API_BASE_URL}/api/products`;
const getAuthToken = () => localStorage.getItem("token");

// adding products
export const addProduct = async (productData) => {
    const token = getAuthToken();
    const response = await axios.post(API_URL, productData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return response.data;
};

//fetching products
export const getProducts = async () => {
    try{
      const response = await axios.get(API_URL);
      return response.data
    }catch(error){
      console.error("Error fetching products: ", error);
      throw error;
    }
  };

//deleting porducts
export const deleteProduct = async (id) => {
    try{
        const token = getAuthToken();
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    }catch(error){
        console.error("Error deleting product: ", error);
        throw error;
    }
};

//updating products
export const updateProduct = async (id, updatedData) => {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};
