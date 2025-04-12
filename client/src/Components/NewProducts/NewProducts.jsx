import axios from "axios";
import React, { useState } from 'react';
import './NewProducts.css';
import { useProductContext } from '../../Contexts/ProductContext';
import { useNavigate } from "react-router-dom";

const NewProducts = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
        category: ''
    });

    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const {
        setProducts,
        products,
        categories
    } = useProductContext();

    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required.';
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price.';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Please select a category.';
        }

        if (!formData.image) {
            newErrors.image = 'Product image is required.';
        } else {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(formData.image.type)) {
                newErrors.image = 'Only JPEG and PNG images are allowed.';
            }
            if (formData.image.size > 1024 * 1024 * 2) {
                newErrors.image = 'Image size must be less than 2MB.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('price', formData.price);
        submissionData.append('description', formData.description);
        submissionData.append('image', formData.image);
        submissionData.append('category', formData.category);
        addProducts(submissionData, token);
        navigate("/")
    };




    console.log(formData)
    const addProducts = async (productData, token) => {
        try {
            const response = await axios.post(
                'https://eshope-2.onrender.com/api/products',
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );


            alert("Product added successfully!")

            // Optional: update products in context
            setProducts([...products, response.data]);

        } catch (error) {
            console.error('Error adding product:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="product-form-wrapper">
            <div className="product-form-card">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <p className="error">{errors.price}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>


                    <div className="form-flex">


                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                name="category"
                                id="category"
                                className="category-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="error">{errors.category}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {errors.image && <p className="error">{errors.image}</p>}

                        </div>

                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default NewProducts;
