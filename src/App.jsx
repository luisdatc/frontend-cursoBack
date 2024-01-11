import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import NewProduct from "./components/NewProduct/NewProduct";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogProvider } from "./components/LogContext";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShoppingBag from "./components/ShoppingBag/ShoppingBag";
import Home from "./components/Home/Home";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordRequest from "./components/ResetPasswordRequest/ResetPasswordRequest";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm/ResetPasswordConfirm";
import ConfirmPasswordChange from "./components/ConfirmPasswordChange/ConfirmPasswordChange";

function App() {
  return (
    <LogProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario" element={<LoginRegister />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<ShoppingBag />} />
          <Route
            path="/reset-password-request"
            element={<ResetPasswordRequest />}
          />
          <Route
            path="/reset-password-confirm"
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/confirm-password-change"
            element={<ConfirmPasswordChange />}
          />
        </Routes>
      </BrowserRouter>
    </LogProvider>
  );
}

export default App;
