import React, { useEffect, useState } from "react";
import "../../CSS/singleProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ADD_TO_CART } from "../../redux/features/product/cartSlice";
import { Link } from "react-router-dom";
import {
  FETCH_RATINGS,
  GIVE_RATINGS,
} from "../../redux/features/product/ratingsSlice";
import { Formik, Form, Field } from "formik";
import Loader from "../../component/loader";
import { ADD_TO_WISHLIST } from "../../redux/features/product/wishlistSlice";
import axios from "axios";
import SimilarProduct from "../../component/similarProduct";
import { BsSearch, BsHeart, BsCart } from "react-icons/bs";
import { nanoid } from "@reduxjs/toolkit";
function SingleProduct() {
  const [products, setProducts] = useState();
  const ratings = useSelector((state) => state.ratings);
  const [hover, setHover] = useState(null);
  const [similarProudct, setSimilarProudct] = useState([]);

  const { id } = useParams();

  const fetchproduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/details/${id}`
      );

      let postData = await response.json();
      setProducts(postData);
      fetchsimilarproudct({
        shape: postData.shape,
        category: postData.category,
        gender: postData.gender,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchsimilarproudct = async (similar) => {
    if (similar) {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/product/fetchsimilarproudct",
        data: similar,
      });
      if (response) {
        setSimilarProudct(response.data);
      }
    }
  };

  useEffect(() => {
    fetchproduct();

    dispatch(FETCH_RATINGS(id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  const dispatch = useDispatch();

  return (
    <>
      {products ? (
        <>
          <div key={products?._id} className="singleProduct">
            <nav
              aria-label="breadcrumb"
              className="ms-3"
              style={{ fontSize: "12px" }}
            >
              <ol className="breadcrumb mt-2 ">
                <Link to="/" className="breadcrumb-item">
                  Proudcts
                </Link>
                <Link to="/products/Eyeglasses" className="breadcrumb-item">
                  {products.category}
                </Link>

                <Link className="breadcrumb-item active" aria-current="page">
                  Details
                </Link>
              </ol>
            </nav>
            <div className="contanier-fluid " style={{ height: "1260px" }}>
              <div className="row">
                <div className="col-8">
                  <div className="row row-cols-2  mx-4 ">
                    {products?.thumnailimages?.map((i) => {
                      return (
                        <>
                          <div
                            className="col my-4"
                            style={{
                              backgroundColor: "rgb(250, 250, 250)",
                            }}
                            key={i.url}
                          >
                            <img
                              className="image"
                              alt=""
                              src={i.url}
                              style={{
                                borderRadius: "20px",

                                backgroundColor: "white",
                                boxShadow:
                                  "0px 0px 10px 0px rgba(176, 175, 175, 0.1)",
                                border: "0",
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                    {products?.images?.map((i) => (
                      <div
                        className="col my-4"
                        style={{
                          backgroundColor: "rgb(250, 250, 250)",
                        }}
                        key={i._public_id}
                      >
                        <img
                          className="image"
                          alt=""
                          src={i?.url}
                          style={{
                            borderRadius: "20px",

                            backgroundColor: "white",
                            boxShadow:
                              "0px 0px 10px 0px rgba(176, 175, 175, 0.1)",
                            border: "0",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className=" product-details-section col-3  my-4"
                  style={{
                    gap: "30px",
                  }}
                >
                  <div className="row  ">
                    <div
                      className="details"
                      style={{
                        maxHeight: "-webkit-fit-content",
                        lineHeight: "10px",
                      }}
                    >
                      <p className="brand-name fs-5">{products?.Brand}</p>
                      <p className="type fs-6 text-muted">
                        {products?.color} {products?.frameType}{" "}
                        {products?.shape}
                      </p>
                      <div
                        className="d-flex align-items-center "
                        style={{
                          backgroundColor: "#EEE",
                          width: "fit-content",
                          borderRadius: "40px",
                          fontSize: "15px",
                          gap: "6px",

                          paddingInline: "12px",
                          lineHeight: "25px",
                        }}
                      >
                        {/* <div>{products?.totolratings}</div> */}
                        <div>{ratings?.ratings?.totolratings}</div>

                        <div
                          style={{
                            color: "#ffc107",
                            fontSize: "x-large",
                          }}
                        >
                          &#9733;
                        </div>
                      </div>
                      <hr></hr>
                      <p className="price fs-5">₹{products.mPrice}</p>
                      <p className="size text-muted fs-6">
                        Size : {products?.size}
                      </p>
                    </div>
                    <hr></hr>

                    <div
                      className="imformation-section"
                      style={{ lineHeight: "20px" }}
                    >
                      <div className="imformation">
                        <p className="fs-6 fw-semibold bold ">
                          Product Details
                        </p>

                        <div className="table" style={{ fontSize: "12px" }}>
                          <table>
                            <tbody>
                              <tr>
                                <td>Product id</td>
                                <td>{products.productId}</td>
                              </tr>

                              <tr>
                                <td>Size</td>
                                <td>{products.size}</td>
                              </tr>
                              <tr>
                                <td>Frame </td>
                                <td>{products.frameType}</td>
                              </tr>
                              <tr>
                                <td>Color</td>
                                <td>{products.color}</td>
                              </tr>
                              <tr>
                                <td>Shape</td>
                                <td>{products.shape}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-1">
                      <button
                        className="addtocart btn"
                        type="button"
                        onClick={() =>
                          dispatch(
                            ADD_TO_CART({
                              productId: products._id,

                              mPrice: products.mPrice,
                            })
                          )
                        }
                      >
                        <BsCart /> Add to Cart
                      </button>
                      <button
                        className=" btn addtocart"
                        style={{
                          background: "#FF647F",
                        }}
                        type="button"
                        onClick={() =>
                          dispatch(
                            ADD_TO_WISHLIST({
                              productId: products._id,
                            })
                          )
                        }
                      >
                        <BsHeart /> Wishlist
                      </button>
                    </div>
                  </div>
                  <div
                    className="row "
                    style={{
                      backgroundColor: "#F0FCF8",
                      borderRadius: "20px",
                      paddingBlock: "10px",
                      paddingInline: "10%",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "-10px",
                        marginLeft: "4px",
                        fontSize: "17px",
                      }}
                    >
                      Rate us..
                    </p>
                    <Formik
                      onSubmit={(values, onSubmitProps) => {
                        onSubmitProps.resetForm();
                        setHover();
                        dispatch(GIVE_RATINGS(values));
                      }}
                      initialValues={{
                        rating: "",
                        comment: "",
                        productId: products._id,
                      }}
                    >
                      {(formik) => (
                        <Form>
                          <div className="star mt-1">
                            {[...Array(5)].map((star, index) => {
                              const currentRating = index + 1;

                              return (
                                <label key={index}>
                                  <Field
                                    style={{ display: "none" }}
                                    className="star"
                                    key={star}
                                    type="radio"
                                    name="rating"
                                    value={currentRating}
                                  />
                                  <span
                                    className="star"
                                    style={{
                                      color:
                                        currentRating <= hover
                                          ? "#ffc107"
                                          : "#e4e5e9",

                                      fontSize: "140%",
                                    }}
                                    onClick={() => setHover(currentRating)}
                                  >
                                    &#9733;
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          <div className="form-outline ">
                            <Field
                              type="text"
                              as="textarea"
                              className="form-control mb-2"
                              placeholder="comment..."
                              name="comment"
                              id="comment"
                            />

                            <button
                              className="btn"
                              type="submit"
                              style={{
                                backgroundColor: "lightblue",
                                border: "0",
                                fontSize: "10px",
                              }}
                              disabled={!formik.dirty}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>

                  <p className="fs-5 " style={{ marginBottom: "-25px" }}>
                    Customer Reviews
                  </p>
                  <div
                    className="ratings row "
                    style={{
                      maxHeight: "28%",
                      gap: "8px",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {" "}
                    <div className="star"></div>
                    {ratings?.ratings?.ratings ? (
                      <>
                        {ratings?.ratings?.ratings.map((i) => (
                          <>
                            <div
                              className="container-fluid"
                              style={{
                                backgroundColor: "#F0FCF8",
                                borderRadius: "20px",
                                paddingBlock: "10px",
                                paddingInline: "10%",
                              }}
                            >
                              <div className="row" style={{ fontSize: "15px" }}>
                                {i.postedby?.firstname} {i.postedby?.lastname}
                              </div>
                              <div className="row">
                                <span
                                  style={{
                                    color: "#ffc107",
                                    fontSize: "15px",
                                  }}
                                >
                                  {[...Array(i?.star)].map((i) => {
                                    return <>&#9733;</>;
                                  })}
                                </span>
                              </div>
                              <div
                                className="row"
                                style={{
                                  fontSize: "12px",
                                  overflowWrap: "break-word",
                                  overflow: "hidden",
                                  textAlign: "justify",
                                }}
                              >
                                {i?.comment}
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <h4>Similar Products</h4>
              <div className="row row-cols-5">
                {similarProudct?.length !== 0 ? (
                  similarProudct.map((i, index) => {
                    const thumnailimages = i?.thumnailimages[0];
                    return (
                      <div
                        key={nanoid()}
                        className="col my-3"
                        onClick={() =>
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          })
                        }
                      >
                        <SimilarProduct
                          key={i._id}
                          _id={i._id}
                          id={i.productId}
                          Brand={i.Brand}
                          mPrice={i.mPrice}
                          size={i.size}
                          thumnailimages={thumnailimages}
                          frameType={i.frameType}
                          color={i.color}
                          shape={i.shape}
                          totolratings={i.totolratings}
                          ratings={i.ratings}
                        />
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              {/* <ProductSlide Products={similarProudct} name="similarproducts" /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}

export default SingleProduct;
