import React, { createContext, useContext, useState } from 'react';


// Create context
const ProductContext = createContext();

// Custom hook
export const useProductContext = () => useContext(ProductContext);

// Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(100000000);

const categories = ['Electronics', 'Fasion', 'Home', 'Books', 'Beauty']

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        categories,
        setProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
