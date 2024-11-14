import { create } from "zustand";

export const useCart = create((set) => ({
	cart: [],
	setCart: (cart) => set({ cart }),
	products: [],
	setProducts: (products) => set({ products }),

	// CREATE
	addCart: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}

		const res = await fetch("/api/products/cart", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});

		const data = await res.json();
		set((state) => ({ cart: [...state.cart, data.data] }));
		return { success: true, message: "Added To Cart" };
	},

	// GET
	fetchCart: async () => {
		const res = await fetch("/api/products/cart");
		const data = await res.json();
		set({ cart: data.data });
	},
	
	// UPDATE
	updateCart: async (pid, updatedProduct) => {
		//passing to backend by fetch request to update the table (schema)
		const res = await fetch(`/api/products/cart/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});

		const data = await res.json();
		//console.log("data:", data);
		//console.log("updatedProduct: ", updatedProduct);
		
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			cart: state.cart.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: "Cart Updated" };
	},

	// DELETE
	removeCart: async (pid) => {
		const res = await fetch(`/api/products/cart/${pid}`, {
			method: "DELETE",
		});

		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ cart: state.cart.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
}));