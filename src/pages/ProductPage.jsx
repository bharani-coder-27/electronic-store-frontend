import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Trash2, PlusCircle } from "lucide-react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // ✅ For filtering
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
    });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  // ✅ Filtered products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.id === parseInt(selectedCategory))
    : products;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-600 mb-6">
        💻 Manage Products
      </h2>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6"
      >
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-3 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-3 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-3 rounded"
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="border p-3 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
        >
          <PlusCircle size={18} /> Add
        </button>
      </form>

      {/* ✅ Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-lg border ${
            selectedCategory === ""
              ? "bg-green-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id.toString())}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === cat.id.toString()
                ? "bg-green-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ✅ Product Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition relative"
          >
            <h3 className="font-semibold text-lg text-gray-700">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.description}</p>
            <p className="text-sm mt-1">
              💰 {p.price} | 📦 {p.quantity}
            </p>
            <p className="text-xs text-gray-400 italic">
              Category: {p.category.name}
            </p>

            {/* ✅ STOCK CONTROL BUTTONS */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={async () => {
                  await API.put(`/products/${p.id}/stock/increase?amount=1`);
                  fetchProducts(); // refresh after update
                }}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
              >
                ➕ Add Stock
              </button>

              <button
                onClick={async () => {
                  await API.put(`/products/${p.id}/stock/decrease?amount=1`);
                  fetchProducts();
                }}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                ➖ Reduce Stock
              </button>
            </div>

            {/* Delete Button (top-right corner) */}
            <button
              onClick={() => handleDelete(p.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="col-span-full text-gray-500 text-center">
            No products found for this category
          </p>
        )}
      </div>
    </div>
  );
}
