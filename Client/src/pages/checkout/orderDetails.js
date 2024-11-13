import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import Loader from "../../component/loader";

function OrderDetails() {
  const orderId = useParams();
  const [order, setOrder] = useState();

  const FETCH_ORDER_DETAILS = async (orderId) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:3001/order/fetchorderdetails`,
        data: orderId,
        headers: {
          "x-auth-token": window.localStorage.getItem("token"),
        },
      });
      if (response.data) {
        setOrder(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    FETCH_ORDER_DETAILS(orderId);
  }, []);

  return (
    <>
      <div className="order-details">
        <Link to="/" className="sticky-top">
          <img
            className="cart-logo ms-5 "
            src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg"
            alt=""
          />
        </Link>
        {order ? (
          <>
            <div
              className="container-fluid pt-2 "
              style={{ width: "fit-content", paddingInline: "150px" }}
            >
              <nav aria-label="breadcrumb" style={{ fontSize: "12px" }}>
                <ol className="breadcrumb mt-2">
                  <Link to="/cart" className="breadcrumb-item">
                    Cart
                  </Link>
                  <Link to="/orders" className="breadcrumb-item">
                    Order
                  </Link>

                  <Link className="breadcrumb-item active" aria-current="page">
                    details
                  </Link>
                </ol>
              </nav>
              <div className="row  pt-3" style={{ lineHeight: "8px" }}>
                <div className="d-flex">
                  <div>
                    <p>Account</p>
                    <p className="text-muted">
                      {window.localStorage.getItem("username")}{" "}
                      {window.localStorage.getItem("userlast")}
                    </p>
                  </div>

                  <div style={{ width: "90%" }}>
                    <p style={{ textAlign: "end" }}>
                      OrderID : {order?.paymentIntet?.id}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="row row-cols-3 ps-4 "
                style={{ border: "1px solid lightgrey" }}
              >
                {order?.products.map((i) => {
                  return (
                    <>
                      <div
                        className="col mt-2 d-flex "
                        style={{ maxWidth: "319px" }}
                      >
                        <div style={{ overflow: "hidden" }}>
                          <img
                            src={i?.product?.thumnailimages[0]?.url}
                            style={{
                              width: "100%",
                              margin: "-70px 0px -70px 0px",
                            }}
                          />

                          <div className="mt-4" style={{ lineHeight: "10px" }}>
                            <p style={{ fontSize: "20px" }}>
                              {i?.product?.Brand}
                            </p>
                            <p style={{ fontSize: "13px" }}>
                              {i?.product?.frameType} • {i?.product?.shape}
                            </p>
                            <p className="text-muted">
                              Color: {i?.product?.color}
                            </p>

                            <p className="text-muted">
                              Size : {i?.product?.size}
                            </p>
                            <p className="text-muted">
                              Price: ₹{i?.product?.mPrice}, QYT:{i?.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              {/* order status div */}
              <div className="row" style={{ border: "1px solid lightgrey" }}>
                <div
                  className="p-2 ps-4"
                  style={{
                    lineHeight: "0px",
                    width: "100%",
                    backgroundColor: "#03a685",
                    color: "white",
                  }}
                >
                  <p>
                    <FaBox /> {order?.orderStatus}
                  </p>{" "}
                  {order?.orderStatus === "ordered" ? (
                    <p> On {order?.paymentIntet?.paymentDate}</p>
                  ) : (
                    <p>On {order?.updatedDate}</p>
                  )}
                </div>

                {/* address div */}

                <div
                  style={{
                    lineHeight: "5px",
                    marginTop: "2px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      backgroundColor: "lightgray",
                      height: "22px",
                      paddingTop: "10px",
                      marginLeft: "-12px",
                      paddingInline: "20px",
                      marginRight: "-12px",
                    }}
                  >
                    Delivery Address
                  </p>
                  <p style={{ paddingInline: "10px" }}>
                    {window.localStorage.getItem("username")}{" "}
                    {window.localStorage.getItem("userlast")}
                    {" / "}
                    {order?.shippingAddress?.phone}
                  </p>
                  <p className="text-muted" style={{ paddingInline: "10px" }}>
                    {order?.shippingAddress?.addresslineOne}
                    {", "}
                    {order?.shippingAddress?.addresslineTwo}
                    {", "}
                    {order?.shippingAddress?.city}
                    {", "}
                    {order?.shippingAddress?.zip}
                  </p>
                </div>
                <hr></hr>

                {/* price div */}

                <div
                  style={{
                    lineHeight: "4px",
                    display: "flex",
                    marginInline: "12px",
                  }}
                >
                  <div style={{ fontSize: "12px", width: "90%" }}>
                    <p style={{ fontSize: "15px" }}>Total Order Price</p>
                    {order?.bill?.discount !== 0 ? (
                      <div className="d-flex">
                        You Saved
                        <p style={{ color: "#03a685", marginInline: "5px" }}>
                          ₹{order?.bill?.discount}
                        </p>{" "}
                        on this order
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <p
                    style={{
                      fontWeight: "bolder",
                      fontSize: "15px",
                      textAlign: "end",
                    }}
                  >
                    ₹{order?.bill?.finalAmout}
                  </p>
                </div>

                {/* payment method div */}
 
                <div
                  style={{
                    backgroundColor: "#F0F0F0",
                    paddingInline: "23px",
                    borderRadius: "5px",
                  }}
                >
                  {order?.paymentIntet?.method === "COD" ? (
                    <p className="text-muted">Cash on Delivery</p>
                  ) : (
                    <></>
                  )}
                </div>
                <hr></hr>

                {/* orderID div */}

                <div className="">
                  <p className="text-muted">
                    OrderID : {order?.paymentIntet?.id}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </>
  );
}

export default OrderDetails;
