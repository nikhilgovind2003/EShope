
import React, { useEffect } from 'react';
import './ViewProducts.css';
import axios from 'axios';
import { useProductContext } from '../../Contexts/ProductContext';
import Filter from '../Filter/Filter';
import Products from '../Products/Products';

export default function ViewProducts() {
  const {
    products,
    selectedCategory,
    priceRange,
    setProducts
  } = useProductContext();

const token = localStorage.getItem("token")

  const getProducts = async () => {
    try {
      const response = await axios.get("https://eshope-2.onrender.com/api/products", {
        params: {
          category: selectedCategory,
          minPrice: 0,
          maxPrice: priceRange,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true)
        setProducts(response.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCategory, priceRange]);

  return (
    <div className="view-products-container">
      <Filter />
      <main className="products-main">
        <h1 className="main-title">Explore Our Products</h1>
        <div className="products-grid">
          {products.map((product, key) => (
            <Products key={key} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
