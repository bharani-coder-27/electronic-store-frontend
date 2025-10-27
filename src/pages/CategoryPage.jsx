import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Trash2, PlusCircle } from "lucide-react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/categories", form);
    setForm({ name: "", description: "" });
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        🗂️ Manage Categories
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-3 rounded flex-1 min-w-[200px]"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-3 rounded flex-1 min-w-[200px]"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          <PlusCircle size={18} /> Add
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-gray-700">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.description}</p>
            <button
              onClick={() => handleDelete(cat.id)}
              className="mt-3 flex items-center gap-1 text-red-600 hover:text-red-800"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
