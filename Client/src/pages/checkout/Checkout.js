import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PriceDetails from "../Cart/PriceDetails";
import CouponBox from "../Cart/CouponBox";
import Button from "../../component/button";
import { PLACE_ORDER } from "../../redux/features/product/placeOrderSlice";
import { RiCloseLine } from "react-icons/ri";
import { Result } from "antd";
import { PageSuccess } from "../ResultPages/ResultPage";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plcaeorder = useSelector((state) => state.placeorder);
  const cart = useSelector((state) => state.cart);
  const [button, setButton] = useState("process to payment");
  const [addressId, setAdddressId] = useState(null);
  const [method, setMethod] = useState(null);

  ////get unplaced orderId///s

  const handlecheckoutaddress = () => {
    const shippingAddressId = addressId;

    var orderId = plcaeorder.orderItems._id;

    if (shippingAddressId && orderId) {
      dispatch(PLACE_ORDER({ shippingAddressId, orderId }));
      setButton("Checkout");
      navigate("/checkout/payment");
    }

    if (method) {
      dispatch(PLACE_ORDER({ shippingAddressId, orderId, method }));
    }
  };

  return (
    <>
      {plcaeorder?.orderItems?.orderStatus === "ordered" ? (
        <>
         <PageSuccess/>
        </>
      ) : (
        <>
          <div style={{ backgroundColor: " rgb(249, 249, 243)" }}>
            <div className="cart-header">
              <Link to="/">
                <img
                 style={{width:"180px",marginTop:"15px"}}
                  className="cart-logo ms-5 "
                  src="https://res.cloudinary.com/pankajoptical/image/upload/v1709921004/pankajoptical_LOGO_ielprm.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-8">
                  <Outlet context={[{ setAdddressId, setMethod }]} />
                </div>
                <div className="col-4 d-flex flex-column">
                  <p className="fs-3 mb-2">Bill details:</p>
                  <PriceDetails
                    totalPrice={cart.cartItems.cartTotal}
                    totalAfterDiscount={cart.cartItems.totalAfterDiscount}
                  />

                  <div onClick={() => handlecheckoutaddress()}>
                    <Button name={button} />
                  </div>
                  <CouponBox CouponApplied={cart.cartItems.CouponApplied} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Checkout;
