import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { TokenProvider } from "./contexts/TokenContext";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Order from "./pages/Order";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles={false}
      theme={{
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
        },
        primaryShade: { light: 4, dark: 8 },
        colorScheme: "light",
      }}
    >
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<App />}>
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </MantineProvider>
  </React.StrictMode>
);
