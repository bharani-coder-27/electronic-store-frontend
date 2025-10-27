import React from "react";
import { ShoppingBag, Package, Users, FileBarChart2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: FileBarChart2 },
    { path: "/categories", label: "Categories", icon: Package },
    { path: "/products", label: "Products", icon: ShoppingBag },
    // { path: "/customers", label: "Customers", icon: Users },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">⚡ Electronic Store</h1>
        <div className="flex space-x-6">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 text-sm font-medium hover:scale-105 transition-transform ${
                location.pathname === path ? "underline text-yellow-300" : ""
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
