// App.tsx

import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import NotFound from "./pages/NotFound";
import ProductGuide from "./pages/ProductGuide";
import BookService from "./pages/BookService";

import AdminOrders from "./pages/admin/AdminOrders";
import AdminServices from "./pages/admin/AdminServices";
import AdminChatPage from "./pages/admin/AdminChatPage";
import AdminEnquiries from "@/pages/admin/Enquiries";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import MyBookings from "./pages/MyBookings";
import ChatPage from "./pages/ChatPage";

import ChangePassword from "./pages/admin/ChangePassword";

import { Toaster } from "@/components/ui/toaster";

import SyncUser from "./components/SyncUser";

import IntroLoader from "./pages/IntroLoader";

import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";

// ================= ADMIN PROTECTED ROUTE =================

// const AdminProtectedRoute = ({
//   children,
// }: {
//   children: JSX.Element;
// }) => {

//   const token =
//     localStorage.getItem(
//       "adminToken"
//     );

//   // NOT LOGGED IN
//   if (!token) {

//     return (
//       <Navigate
//         to="/admin"
//         replace
//       />
//     );
//   }

//   return children;
// };

const App = () => {

  const [loading,
    setLoading] =
    useState(true);

  // INTRO LOADER
  useEffect(() => {

    const timer =
      setTimeout(() => {

        setLoading(false);

      }, 3000);

    return () =>
      clearTimeout(timer);

  }, []);

  return (
    <>

      {/* LOADER */}
      <AnimatePresence>
        {loading && (
          <IntroLoader />
        )}
      </AnimatePresence>

      {/* MAIN APP */}
      {!loading && (

        <BrowserRouter>

          <SyncUser />

          <Routes>

            {/* ================= PUBLIC ================= */}

            <Route
              path="/"
              element={<Index />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/services"
              element={<Services />}
            />

            <Route
              path="/projects"
              element={<Projects />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/product-guide"
              element={<ProductGuide />}
            />

            <Route
              path="/book/:id"
              element={<BookService />}
            />

            {/* ================= USER ================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

            <Route
              path="/chat"
              element={<ChatPage />}
            />

            {/* ================= ADMIN LOGIN ================= */}

            <Route
              path="/admin"
              element={<AdminLogin />}
            />

            {/* ================= ADMIN PROTECTED ================= */}

            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/services"
              element={
                <AdminProtectedRoute>
                  <AdminServices />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/chat"
              element={
                <AdminProtectedRoute>
                  <AdminChatPage />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/admin/enquiries"
              element={
                <AdminProtectedRoute>
                  <AdminEnquiries />
                </AdminProtectedRoute>
              }
            />

            {/* ================= CHANGE PASSWORD ================= */}

            <Route
              path="/admin/change-password"
              element={
                <AdminProtectedRoute>
                  <ChangePassword />
                </AdminProtectedRoute>
              }
            />

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

          <Toaster />

        </BrowserRouter>

      )}

    </>
  );
};

export default App;