import { useState, useEffect } from "react";
import { addWishlistItem, getWishlistItems, deleteWishlistItem } from '../api/wishlistApi.js';
import Message from "../components/Message.jsx";
import "./WishPage.css";

export default function WishPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceRange: "",
  });

  const [wishlistItems, setWishlistItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async() => {
    try{
      const response = await getWishlistItems();
      setWishlistItems(response.data);
    }catch(error){
      console.error("Error Fetching Wishlist items", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try{
      await deleteWishlistItem(id);
      setWishlistItems(wishlistItems.filter(item => item._id !== id));
      setMessage("Wishlist item deleted successfully");
      setIsError(false);
    }catch(error){
      console.error("Error deleting wishlist item", error);
      setMessage("Failed to delete item");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const wishListData = {
      name: formData.name,
      description: formData.description,
      priceRange: formData.priceRange,
    };

    try{
      const response = await addWishlistItem(wishListData);
      console.log("WIshlist Item added Successfully", response);

      setMessage("Wishlist item added successfully");
      setIsError(false);

      setFormData({
        name: "",
        description: "",
        priceRange: "",
      });

      fetchWishlistItems();
    }catch(error){
      console.error("Error adding wishlist item", error);
      setMessage(error.response?.data?.message || "failed to add Item");
      setIsError(true);
    }
  };

  const handleCloseMessage = () => {
    setMessage("");
  };

  return (
    <div className="wish-container">
      <h2>Wishlist an Item</h2>

      {message && (
        <Message message={message} isError={isError} onClose={handleCloseMessage}/>
      )}

      <form onSubmit={handleSubmit}>
        <div className="wish-container-fields">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            name="name"
            id="itemName"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="wish-container-fields">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Add description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="wish-container-fields">
          <label htmlFor="priceRange">Preferred Price Range</label>
          <input
            type="text"
            name="priceRange"
            id="priceRange"
            placeholder="e.g. ₹50 - ₹100"
            value={formData.priceRange}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">Submit</button>
      </form>

      {!showTable && (
        <button id= "show-wishlist-btn" onClick={() => setShowTable(true)}>Show Wishlist</button>
      )}

      {
        showTable && (
          <div>
            <h2>Wishlist Items</h2>
            <table className="wishlist-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price Range</th>
                  <th>Delete Post</th>
                </tr>
              </thead>

              <tbody>
                {wishlistItems.length > 0 ? (
                  wishlistItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.priceRange}</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ): (
                  <tr>
                    <td colSpan="3">No Wishlist items available</td>
                  </tr>
                )}
              </tbody>
            </table>

            <button onClick={ () => setShowTable(false)}>Close Wishlist</button>
          </div>
        )
      }

      
    </div>
  );
}
