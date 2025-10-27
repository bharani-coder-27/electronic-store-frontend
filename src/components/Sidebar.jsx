import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/categories", label: "Categories", icon: Package },
    { path: "/products", label: "Products", icon: ShoppingBag },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-5 flex flex-col">
      <h1 className="text-xl font-bold text-green-600 mb-6">
        🛍️ Electronic Store
      </h1>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
