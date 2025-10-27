import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Dashboard Layout wraps all dashboard pages */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <DashboardLayout>
              <CategoryPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DashboardLayout>
              <ProductPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}
