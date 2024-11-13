import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import "./App.css";
import { Privateroutes } from "./privateRoutes/privateRoute";
import { lazy } from "react";
import { Suspense } from "react";
const Productpage = lazy(() => import("./pages/ProductPages/Productpage"));
const About = lazy(() => import("./pages/About/About"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Favorite = lazy(() => import("./pages/Favorite/Favorite"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const SingleProduct = lazy(() => import("./pages/SingleProduct/singleProduct"));
const Profile = lazy(() => import("./pages/Customer/profile"));
const Address = lazy(() => import("./pages/Customer/address"));
const Customer = lazy(() => import("./pages/Customer/customer"));
const OrderDetails = lazy(() => import("./pages/checkout/orderDetails"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Payment = lazy(() => import("./pages/checkout/payment"));
const CheckoutAddress = lazy(() => import("./pages/checkout/checkoutAddress"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="checkout" element={<Checkout />}>
              <Route index element={<CheckoutAddress />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route
              path="orders"
              element={
                <Privateroutes>
                  <Orders />
                </Privateroutes>
              }
            />
            <Route
              path="orders/details/:orderId"
              element={
                <Privateroutes>
                  <OrderDetails />
                </Privateroutes>
              }
            />
            <Route
              path="cart"
              element={
                <Privateroutes>
                  <Cart />
                </Privateroutes>
              }
            />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products/:name" element={<Productpage />} />

              <Route path="/details/:id" element={<SingleProduct />} />
              <Route path="/customer" element={<Customer />}>
                <Route index element={<Profile />} />
                <Route path="address" element={<Address />} />
              </Route>

              <Route
                path="favorite"
                element={
                  <Privateroutes>
                    <Favorite />
                  </Privateroutes>
                }
              />

              <Route />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
