import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

//CREATE PRODUCTS
export const createProduct = async (req, res) => {
	const product = req.body; 
	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product); 

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//READ PRODUCTS
export const getProducts = async (req, res) => {
	
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//UPDATE PRODUCTS
export const updateProduct = async (req, res) => {
	const { id } = req.params; 

	const product = req.body; 
	
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//DELETE PRODUCTS
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


//CREATE CART
export const addCart = async (req, res) => {
	const product = req.body; 

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Cart(product); 

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in add to cart:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//READ CART
export const getCart = async (req, res) => {
	
	try {
		const products = await Cart.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching cart:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//UPDATE CART
export const updateCart = async (req, res) => {
	//receiving id and product from the frontend fetch request
	const { id } = req.params; 
	const product = req.body; 
	
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	const items = await Cart.findById(id);
	if(items == null) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Cart.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//DELETE CART
export const removeCart = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	//const item = await Cart.findById(id);
	//console.log(item);

	try {
		await Cart.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Removed From Cart" });
	} catch (error) {
		console.log("error in removing from cart:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};