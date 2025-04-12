import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";
import { useProductContext } from "../../Contexts/ProductContext";

const EditProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
    });

    const {
        categories
    } = useProductContext();

    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const token = localStorage.getItem("token");


    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`https://eshope-2.onrender.com/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "Valid price is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
      
        try {
          const response = await axios.patch(`https://eshope-2.onrender.com/api/products/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Update successful", response.data);
          alert("Product updated successfully");
          navigate("/");
        } catch (error) {
          console.error("Update failed:", error.response?.data || error.message);
          alert("Failed to update product");
        }
      };
      

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={handleSubmit} noValidate>
                <h2>Edit Product</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                {errors.price && <span className="error-text">{errors.price}</span>}

                <select
                    name="category"
                    id="category"
                    className="category-select"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories
                        .map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={4}
                ></textarea>
                {errors.description && <span className="error-text">{errors.description}</span>}

                <label htmlFor="image">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
