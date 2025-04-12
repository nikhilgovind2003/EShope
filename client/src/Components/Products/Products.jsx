import React from 'react';
import './Products.css';
import { useNavigate } from "react-router-dom";

const Products = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://eshope-8z1d.onrender.com/api/products/${product._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Product deleted successfully");
          onDelete && onDelete(product._id);
        } else {
          const errorData = await response.json();
          console.error("Error deleting product:", errorData.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          className="product-image"
          src={`https://eshope-8z1d.onrender.com/uploads/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <div className="product-main">
          <h4 className="product-title">{product.name}</h4>
          <span className="product-price">₹{product.price}</span>
        </div>


        <p className="product-category">{product.category}</p>

        <p className="product-description">
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </p>

        <div className="product-buttons">
          <button
            onClick={() => navigate(`/edit-product/${product._id}`)}
            className="edit-button"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
