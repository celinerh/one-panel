import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/products";
import { TokenProvider } from "./contexts/TokenContext";
import Customers from "./pages/customers";
import NotFound from "./pages/notFound";
import Product from "./pages/products/product";
import Order from "./pages/orders/order";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import CreateProduct from "./pages/products/create";
import Orders from "./pages/orders";

const customEmotionCache = createEmotionCache({ key: "one-panel" });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={customEmotionCache}
      theme={{
        breakpoints: {
          md: 767,
        },
        colors: {
          primary: [
            "#f0fdf4",
            "#dcfce7",
            "#bbf7d0",
            "#86efac",
            "#4ade80",
            "#22c55e",
            "#16a34a",
            "#15803d",
            "#166534",
            "#14532d",
          ],
          secondary: [
            "#fef2f2",
            "#fee2e2",
            "#fecaca",
            "#fca5a5",
            "#f87171",
            "#ef4444",
            "#dc2626",
            "#b91c1c",
            "#991b1b",
            "#7f1d1d",
          ],
          tertiary: [
            "#f9fafb",
            "#f3f4f6",
            "#e5e7eb",
            "#d1d5db",
            "#9ca3af",
            "#6b7280",
            "#4b5563",
            "#374151",
            "#1f2937",
            "#111827",
          ],
        },
        primaryShade: { light: 4, dark: 8 },
        colorScheme: "light",
      }}
    >
      <NotificationsProvider position="top-right" zIndex={2077}>
        <ModalsProvider>
          <TokenProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<App />}>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/create" element={<CreateProduct />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/order/:id" element={<Order />} />
                  <Route path="/customers" element={<Customers />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TokenProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
