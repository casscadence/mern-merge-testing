import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Cart = mongoose.model("Carts", cartSchema);

export default Cart;