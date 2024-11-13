import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_ORDERS } from "../../redux/features/product/orderSlice";
import { PLACE_ORDER } from "../../redux/features/product/placeOrderSlice";
import { PageInfo } from "../ResultPages/ResultPage";
import Loader from "../../component/loader";
import { Page500 } from "../ResultPages/ResultPage";
function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order);

  const handleOrderClick = ({ orderStatus, orderId }) => {
    if (orderStatus === "payment pending") {
      dispatch(PLACE_ORDER({ orderId: orderId }));
      navigate("/checkout");
    }
    if (orderStatus === "ordered") {
      navigate(`details/${orderId}`);
    }
  };

  useEffect(() => {
    dispatch(FETCH_ORDERS());
  }, []);

  return (
    <>
      <div className="cart px-5" style={{backgroundColor:"rgb(249, 249, 243)"}}>
        <div className="cart-header sticky-top pb-1 ">
          <Link to="/">
            <img
              style={{ width: "180px", marginTop: "15px" }}
              className="cart-logo ms-5 "
              src="https://res.cloudinary.com/pankajoptical/image/upload/v1709921004/pankajoptical_LOGO_ielprm.png"
            />
          </Link>
          <nav
            aria-label="breadcrumb "
            style={{ fontSize: "12px", marginLeft: "4%" }}
          >
            <ol className="breadcrumb mt-2">
              <Link to="/" className="breadcrumb-item">
                Products
              </Link>
              <Link to="/cart" className="breadcrumb-item">
                Cart
              </Link>

              <Link className="breadcrumb-item active" aria-current="page">
                Orders
              </Link>
            </ol>
          </nav>
        </div>
        <div className=" cart-body mx-4">
          {orders?.loading ? (
            <>
              <Loader />
            </>
          ) : orders?.status > 400 ? (
            <>
              <Page500 />
            </>
          ) : orders?.orderItems?.order?.length > 0 ? (
            <>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8"> 
                    {orders?.orderItems?.order?.map((Item) => (
                      <>
                        {Item.products.map((i) => (
                          <>
                            <div
                              className="container-fluid"
                              style={{
                                borderRadius: "20px",

                                backgroundColor: "white",
                                boxShadow:
                                  "0px 0px 2px 2px rgba(176, 175, 175, 0.1)",
                                border: "0",
                                margin: "20px 0px",
                              }}
                              onClick={() =>
                                handleOrderClick({
                                  orderStatus: Item.orderStatus,
                                  shippingAddress: Item.shippingAddress,
                                  orderId: Item._id,
                                })
                              }
                            >
                              <div
                                className="row align-items-center "
                                style={{ overflow: "hidden" }}
                              >
                                <div className="d-flex pt-3   ">
                                  <GiCardboardBoxClosed
                                    style={{
                                      marginTop: "-8px",
                                      fontSize: "30px",
                                      color: "darkblue",
                                      width: "7%",
                                    }}
                                  />
                                  {Item.orderStatus === "payment pending" ? (
                                    <>
                                      <div style={{ lineHeight: "0px" }}>
                                        <p>{Item.orderStatus}</p>

                                        <p>On {Item.orderDate}</p>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div style={{ lineHeight: "0px" }}>
                                        <p>: {Item.orderStatus}</p>
                                        {Item.orderStatus === "ordered" ? (
                                          <p>
                                            On {Item?.paymentIntet?.paymentDate}
                                          </p>
                                        ) : (
                                          <p>On {Item.updatedDate}</p>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <hr></hr>
                                <div className="col-3  ">
                                  <Link to="/productdetails">
                                    <img
                                      style={{
                                        width: "100%",
                                        margin: "-10px 0px -10px 0px ",
                                      }}
                                      src={i.product?.thumnailimages[0]?.url}
                                    />
                                  </Link>
                                </div>
                                <div
                                  className="col-7"
                                  style={{
                                    lineHeight: "10px",
                                  }}
                                >
                                  <p className="fs-5 ">{i.product.Brand}</p>
                                  <hr></hr>
                                  <p className="fs-6">
                                    {i.product.color} {i.product.frameType}{" "}
                                    {i.product.shape}
                                  </p>
                                  <p className="fs-6 text-muted">
                                    Size: {i.product.size}, Quantity:{" "}
                                    {i?.quantity}
                                  </p>
                                </div>
                                <div className="col-1 "></div>
                                <div
                                  className="col-1 "
                                  style={{
                                    marginTop: "-43px",
                                  }}
                                >
                                  <GrNext />
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <PageInfo
                discription="No orders"
                buttonName="Countinue Shopping?"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
