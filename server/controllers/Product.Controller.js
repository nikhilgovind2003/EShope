import ProductModel from "../models/Product.Model.js";

// CREATE - Add a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!req.file) {
      return res.status(400).json({ message: "File upload is required" });
    }

    const imagePath = `${req.file.filename}`;
    
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      image:imagePath,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// READ - All with Filters
export const getAllProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (category && category !== "All") {
      filter.category = { $regex: category, $options: "i" };
    }
  
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    

    const products = await ProductModel.find(filter);
    res.status(201).json({
      success: true,
      products,
      
    });
  } catch (error) {
    res.status(501).json({ message: "Server Error", error: error.message });
  }
};

// READ - Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const updateData = {
      name,
      description,
      price,
      category,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// DELETE - Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
