import { useState, useEffect } from "react";
import axios from "axios";
import "./BuyPage.css";
import dummyImage from "../assets/dummy.jpg";
import { getProducts } from "../api/productApi";
import CategoryDropdown from "../components/CategoryDropdown";

const categories = ['Electronics and Appliances', 
                    'Vehicles', 
                    'Real Estate', 
                    'Furniture and Home Decor', 
                    'Fashion and Accessories', 
                    'Stationary', 
                    'Books', 
                    'Sports and Hobbies', 
                    'Tools and Machinery', 
                    'Jobs, Services and Software'];


const BuyPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {
    const fetchProducts = async () => {
      try{
        setLoading(true);
        const response = await getProducts(selectedCategory);
        console.log("Fetched Resposnse: ", response);
        setProducts(Array.isArray(response.data)? response.data: []);
      }catch(error){
        console.error("Error fetching products:", err);
        setError("Failed to Fetch Products");
      }finally{
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="buy-page">
      <div className="buy-page-header">
        <h1>Buy Items</h1>
        <div className="filter-dropdown">
          <CategoryDropdown categories={categories} selectedCategory={selectedCategory} onChange={setSelectedCategory}/>
        </div>
      </div>

      { loading && <p>Loading Products, please wait</p>}
      { error && <p>{error}</p>}

      <div className="item-grid">
        {products.map((item) => (
          <div key={item._id} className="item-card">
            <img src={item.image || dummyImage} alt={item.name} className="item-image" />
            <h3>{item.name}</h3>
            <p>Posted on: {item.createdAt.substring(0,10).split("-").reverse().join("-")}</p>
            <button onClick={() => setSelectedItem(item)}>Know More</button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>X</button>
            <h2 className="selected-item">{selectedItem.name}</h2>
            <div className="modal-details">
              <div className="modal-item-details">
                <h3>Item Details</h3>
                <img src={selectedItem.image || dummyImage} alt={selectedItem.name} className="modal-image" />
                <div className="modal-item-description">
                  <p><strong>Description:</strong> {selectedItem.description}</p>
                  <p><strong>Price:</strong> {selectedItem.price}</p>
                </div>
              </div>
              <div className="seller-details">
                <h3>Seller Details</h3>
                <div className="modal-seller-details">
                  <p><strong>Name:</strong> {selectedItem.seller?.name}</p>
                  <p><strong>Staff No:</strong> {selectedItem.seller?.staffno}</p>
                  <p><strong>Phone:</strong> {selectedItem.seller?.telephone}</p>
                  <p><strong>Mobile:</strong> {selectedItem.seller?.mobile}</p>
                  <p><strong>Email:</strong> {selectedItem.seller?.email}</p>
                  <p><strong>Address:</strong> {selectedItem.seller?.address}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
