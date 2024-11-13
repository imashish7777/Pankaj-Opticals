import React, { useEffect } from "react";
import "../../CSS/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PriceDetails from "./PriceDetails";
import CouponBox from "./CouponBox";
import Button from "../../component/button";
import { PageInfo } from "../ResultPages/ResultPage";
import Loader from "../../component/loader";

import {
  FETCH_CART,
  REMOVE_FROM_CART,
  DECREMENT,
  INCREMENT,
  emptycart,
} from "../../redux/features/product/cartSlice";
import { PLACE_ORDER } from "../../redux/features/product/placeOrderSlice";
import { Page500 } from "../ResultPages/ResultPage";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handlecheckout = () => {
    dispatch(PLACE_ORDER());
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(FETCH_CART());
  }, []);

  return (
    <div className="root-cart">
      <Link to="/" >
        <img style={{width:"180px",marginTop:"15px"}}
          className="cart-logo ms-5 "
          src="https://res.cloudinary.com/pankajoptical/image/upload/v1709921004/pankajoptical_LOGO_ielprm.png"
        />
      </Link>
      {cart?.loading ? (
        <div style={{ paddingBlock: "14%" }}>
          <Loader />
        </div>
      ) : cart?.status > 400 ? (
        <Page500 />
      ) : Object.keys(cart?.cartItems).length !== 0 ? (
        <>
          <div className="cart px-5">
            <nav
              aria-label="breadcrumb"
              style={{ fontSize: "12px", marginLeft: "3%" }}
            >
              <ol className="breadcrumb mt-2">
                <Link to="/" className="breadcrumb-item">
                  Products
                </Link>

                <Link className="breadcrumb-item active" aria-current="page">
                  Cart
                </Link>
              </ol>
            </nav>
            <div className=" cart-body mx-4">
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-3 ">
                    <p className="fs-4">
                      Cart : {cart?.cartItems?.products?.length || 0}
                    </p>
                  </div>
                  <div className="col-5 text-end">
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(emptycart())}
                    >
                      Empty Cart
                    </button>
                  </div>
                </div>
                <div className="row">
                  <>
                    <div className="col-8">
                      {cart?.cartItems?.products &&
                        cart?.cartItems?.products?.map((Item) => {
                          return (
                            <>
                              <div
                                key={Item?.product?._id}
                                className="cartproduct my-4  p-4"
                              >
                                <div className="container-fluid ">
                                  <div className="row">
                                    <div className="col-5 ">
                                      <Link
                                        to={`/details/${Item.product?._id}`}
                                      >
                                        {Item.product?.thumnailimages ? (
                                          <img
                                            src={
                                              Item?.product?.thumnailimages[0]
                                                ?.url
                                            }
                                          />
                                        ) : (
                                          <></>
                                        )}
                                      </Link>
                                    </div>
                                    <div className="col-7">
                                      <p className="fs-6">
                                        {Item.product?.Brand}{" "}
                                        {Item.product?.color}{" "}
                                        {Item.product?.frameType}{" "}
                                        {Item.product?.shape}
                                      </p>
                                      <hr></hr>

                                      <div className="final-price">
                                        <p className="fs-6">
                                          Final price{" "}
                                          <span>₹{Item.product?.mPrice}</span>
                                        </p>
                                      </div>
                                      <hr></hr>
                                      <div className="d-flex gap-30 ">
                                        <div
                                          onClick={() => {
                                            dispatch(
                                              REMOVE_FROM_CART({
                                                productId: Item.product?._id,
                                                mPrice: Item.product?.mPrice,
                                              })
                                            );
                                          }}
                                          type="button"
                                          className=" text-primary text-decoration-underline fs-6 "
                                        >
                                          Remove
                                        </div>

                                        <div className="quantity-meter">
                                          <button
                                            type="button"
                                            className="btn quantity"
                                            onClick={() =>
                                              dispatch(
                                                DECREMENT({
                                                  productId: Item.product?._id,
                                                  mPrice: Item.product?.mPrice,
                                                })
                                              )
                                            }
                                            disabled={
                                              Item.quantity === 1 ? true : false
                                            }
                                          >
                                            -
                                          </button>
                                          <div className="fs-6 px-3">
                                            {Item.quantity}
                                          </div>
                                          <button
                                            type="button"
                                            className="btn quantity"
                                            onClick={() =>
                                              dispatch(
                                                INCREMENT({
                                                  productId: Item.product?._id,
                                                  mPrice: Item.product?.mPrice,
                                                })
                                              )
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <p className="fs-2 ms-3">Bill Details</p>
                        <PriceDetails
                          totalPrice={cart.cartItems?.cartTotal}
                          totalAfterDiscount={
                            cart.cartItems?.totalAfterDiscount
                          }
                        />
                        <div onClick={() => handlecheckout()}>
                          <Button name="Proceed to checkout" />
                        </div>

                        <CouponBox
                          CouponApplied={cart?.cartItems?.CouponApplied}
                        />
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageInfo
            discription="Cart is Empty"
            buttonName="Countinue Shopping?"
          />
        </>
      )}
    </div>
  );
}

export default Cart;
