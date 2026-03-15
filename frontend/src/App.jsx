import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/Theme";
import ScrollToTop from "./components/common/ScrollToTop";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

// Public Pages
import Home from "./pages/public/Home";
import Properties from "./pages/public/Properties";
import PropertyDetail from "./pages/public/PropertyDetail";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Testimonials from "./pages/public/Testimonials";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProperties from "./pages/admin/Properties";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminMessages from "./pages/admin/Messages";
import AdminManagement from "./pages/admin/Admin";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken");
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="admins" element={<AdminManagement />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
