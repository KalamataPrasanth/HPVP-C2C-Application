import axios from "axios";

const API_BASE_URL = 
    window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : `http://${window.location.hostname}:5000`;


const API_URL = `${API_BASE_URL}/api/wishlist`;

export const addWishlistItem = async (wishlistData) => {
  try {
    const response = await axios.post(API_URL, wishlistData);
    return response.data;
  } catch (error) {
    console.error("Error adding wishlist item:", error);
    throw error;
  }
};

export const getWishlistItems = async () => {
  try{
    const response = await axios.get(API_URL);
    return response.data
  }catch(error){
    console.error("Error fetching wishlist items: ", error);
    throw error;
  }
};

export const deleteWishlistItem = async (id) => {
  try{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }catch(error){
    console.error("Error deleting wishlist item: ", error);
    throw error;
  }
}