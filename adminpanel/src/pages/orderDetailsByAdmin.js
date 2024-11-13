import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaBox } from "react-icons/fa";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ORDER,
  UPDATE_ORDER,
} from "../redux/features/product/orderSlice";

function OrderDetailsByadmin() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(FETCH_ORDER({ orderId: orderId }));
  }, []);

  ///ant d //

  const items = [
    {
      key: "1",
      label: (
        <a
          onClick={() => {
            dispatch(
              UPDATE_ORDER({ orderId: orderId, orderStatus: "Dispatched" })
            );
          }}
        >
          Dispatched
        </a>
      ),
    },

    {
      key: "2",
      label: (
        <a
          onClick={() => {
            dispatch(
              UPDATE_ORDER({ orderId: orderId, orderStatus: "Delivered" })
            );
          }}
        >
          Delivered
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            dispatch(UPDATE_ORDER({ orderId: orderId, orderStatus: "Return" }));
          }}
        >
          Return
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <a
          onClick={() => {
            dispatch(
              UPDATE_ORDER({ orderId: orderId, orderStatus: "Cancelled" })
            );
          }}
        >
          Cancelled
        </a>
      ),
      icon: <SmileOutlined />,
    },
  ];

  return (
    <>
      <div className="order-details">
        {order?.orderItem ? (
          <>
            <div className="container-fluid pt-2 ">
              <div className="row  pt-3" style={{ lineHeight: "8px" }}>
                <div className="d-flex">
                  <div style={{ width: "90%" }}>
                    <div>
                      <Dropdown
                        menu={{
                          items,
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {order.orderItem.orderStatus}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>

                    <p style={{ textAlign: "end" }}>
                      shippingID : {order.orderItem?.paymentIntet?.id}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="row row-cols-3 ps-4 "
                style={{ border: "1px solid lightgrey" }}
              >
                {order?.orderItem?.products?.map((i) => {
                  return (
                    <>
                      <div
                        className="col mt-2 d-flex "
                        style={{ maxWidth: "319px" }}
                      >
                        <div style={{ overflow: "hidden" }}>
                          <img
                            src={i?.product?.images[0]}
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
                    <FaBox /> {order.orderItem?.orderStatus}
                  </p>
                  <p>
                    On{" "}
                    {order?.orderItem?.orderStatus === "ordered"
                      ? order.orderItem?.orderDate
                      : order?.orderItem?.updatedDate}
                  </p>
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
                    {order.orderItem?.shippingAddress?.firstname}{" "}
                    {order.orderItem?.shippingAddress?.lastname}
                    {" / "}
                    {order.orderItem?.shippingAddress?.phone}
                  </p>
                  <p className="text-muted" style={{ paddingInline: "10px" }}>
                    {order.orderItem?.shippingAddress?.addresslineOne}
                    {", "}
                    {order.orderItem?.shippingAddress?.addresslineTwo}
                    {", "}
                    {order.orderItem?.shippingAddress?.city}
                    {", "}
                    {order.orderItem?.shippingAddress?.zip}
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
                    {order.orderItem?.bill?.discount !== 0 ? (
                      <div className="d-flex">
                        You Saved
                        <p style={{ color: "#03a685", marginInline: "5px" }}>
                          ₹{order.orderItem?.bill?.discount}
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
                    ₹{order.orderItem?.bill?.finalAmout}
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
                  {order.orderItem?.paymentIntet?.method === "COD" ? (
                    <p className="text-muted">Cash on Delivery</p>
                  ) : (
                    <></>
                  )}
                </div>
                <hr></hr>

                {/* orderID div */}

                <div className="">
                  <p className="text-muted">
                    OrderID : {order.orderItem?.paymentIntet?.id}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>{/* <Loader/> */}</>
        )}
      </div>
    </>
  );
}

export default OrderDetailsByadmin;
