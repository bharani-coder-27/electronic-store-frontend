import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Package, ShoppingBag, Layers, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, catRes] = await Promise.all([
        API.get("/products"),
        API.get("/categories"),
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity < 5);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-green-600 mb-6">
        📊 Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card label="Total Categories" value={totalCategories} color="green" Icon={Layers} />
        <Card label="Total Products" value={totalProducts} color="blue" Icon={ShoppingBag} />
        <Card label="Total Stock" value={totalStock} color="purple" Icon={Package} />
        <Card label="Low Stock" value={lowStock.length} color="red" Icon={AlertTriangle} />
      </div>
    </div>
  );
}

function Card({ label, value, color, Icon }) {
  const colorMap = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white shadow p-5 rounded-xl flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className={`text-3xl font-bold ${colorMap[color]}`}>{value}</h2>
      </div>
      <Icon size={40} className={colorMap[color]} />
    </div>
  );
}
