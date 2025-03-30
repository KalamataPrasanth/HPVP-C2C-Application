import { useState, useEffect } from "react";
import { addProduct, getProducts, deleteProduct, updateProduct } from "../api/productApi.js";
import Message from "../components/Message.jsx";
import './SellPage.css';

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    preview: "",
  });

  const [products, setProducts] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await getProducts();
      setProducts(response.data);
    }catch(error){
      console.error("Error Fetching Products", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
      setMessage("Product deleted successfully");
      setIsError(false);
    } catch (error) {
      console.error("Error deleting product", error);
      setMessage("Failed to delete product");
      setIsError(true);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditData({ name: product.name, description: product.description, price: product.price });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value}));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  }

  const handleSaveEdit = async (id) => {
    try {
      await updateProduct(id, editData);
      setProducts(products.map(prod => (prod._id === id ? { ...prod, ...editData } : prod)));
      setEditingId(null);
      setMessage("Product updated successfully");
      setIsError(false);
    } catch (error) {
      console.error("Error updating product", error);
      setMessage("Failed to update product");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else{
        setFormData((prev) => ({ ...prev, image: null, preview: ""}));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const staffno = localStorage.getItem("staffno");
    if(!staffno){
      setMessage("User not logged in");
      setIsError(true);
      return;
    }

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("staffno", staffno);
    if(formData.image){
      console.log("Appending Image:", formData.image);
      productData.append("image", formData.image);
    }else{
      console.warn("No image Selected");
    }

    try{
      const response = await addProduct(productData);
      console.log("Product added Successfully: ", response);

      setMessage("Product added Successfully!");
      setIsError(false);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
        preview: "",
      });

      fetchProducts();
    }catch(error){
      console.error("Error adding product: ", error);
      setMessage(error.response?.data?.message || "Failed to add product");
      setIsError(true);
    };

  };

  const handleCloseMessage = () => {
    setMessage("");
  }

  return (
    <div className="sell-container">
      <h2>Sell an Item</h2>

      { message && (
        <Message message = {message} isError={isError} onClose={handleCloseMessage}/>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="sell-container-fields">
            <label htmlFor="name">Item Name</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
        </div>

        <div className="sell-container-fields">
            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
        </div>

        <div className="sell-container-fields">
            <label htmlFor="price">Price</label>
            <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
            />
        </div>
        <div className="sell-container-fields">
            <label htmlFor="image">Upload Image</label>
            <input name="image" id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
            {formData.preview && <img src={formData.preview} alt="Preview" className="image-preview" />}    
        </div>

        <button type="submit">Submit</button>
      </form>
      
      {!showTable && (
        <button id="show-products-btn" onClick={ ()=> setShowTable(true)}>Show Products</button>
      )}

      {showTable && (
        <div>
          <h2>Available Products</h2>
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Product</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ?(
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{editingId === product._id ? (
                            <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
                          ) : (product.name)
                        }
                    </td>
                    <td>{editingId === product._id ? (
                            <input type="text" name="description" value={editData.description} onChange={handleEditChange} />
                          ) : (product.description)
                        }
                    </td>
                    <td>{editingId === product._id ? (
                            <input type="number" name="price" value={editData.price} onChange={handleEditChange} />
                          ) : (product.price)
                        }
                    </td>
                    <td>
                      <div id="action-btns">
                        {editingId === product._id ? (
                          <>
                            <button onClick={() => handleSaveEdit(product._id)}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handleEditClick(product)}>Edit</button>
                        )}
                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ):(
                <tr>
                  <td colSpan="4">No products Added Yet</td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={() => setShowTable(false)}>Close Products</button>
        </div>
      )}

    </div>
  );
}
