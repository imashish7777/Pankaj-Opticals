import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
function SingleProduct() {
  const [products, setProducts] = useState();

  const { id } = useParams();

  const fetchproduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/products/details/${id}`
      );

      let postData = await response.json();
      setProducts(postData);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [id]);

  return (
    <>
      {products ? (
        <>
          <div key={products?._id} className="singleProduct">
            <div className="contanier-fluid">
              <div className="row">
                <div className="col-8">
                  <div className="container">
                    <div className="row row-cols-3  mx-4 ">
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
                                src={i?.url}
                                style={{
                                  borderRadius: "20px",
                                  width: "100%",

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
                        >
                          <img
                            src={i?.url}
                            style={{
                              borderRadius: "20px",
                              width: "100%",

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
                      {" "}
                      <p>{products?.category}</p>
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
                          marginBlock: "5px",
                        }}
                      >
                        <div>Ratings:{products?.totolratings}</div>
                        <div
                          style={{
                            color: "#ffc107",
                            fontSize: "x-large",
                          }}
                        >
                          &#9733;
                        </div>
                      </div>
                      <div
                        className="d-flex align-items-center "
                        style={{
                          backgroundColor: "#EEE",
                          width: "fit-content",
                          borderRadius: "40px",
                          fontSize: "15px",
                          gap: "6px",
                          marginBlock: "5px",

                          paddingInline: "12px",
                          lineHeight: "25px",
                        }}
                      >
                        <div>Views: {products?.views}</div>
                      </div>
                      <div
                        className="d-flex align-items-center "
                        style={{
                          backgroundColor: "#EEE",
                          width: "fit-content",
                          borderRadius: "40px",
                          fontSize: "15px",
                          gap: "6px",
                          marginBlock: "5px",

                          paddingInline: "12px",
                          lineHeight: "25px",
                        }}
                      >
                        <div>Wishlisted: {products?.wishlistcount}</div>
                      </div>
                      <div
                        className="d-flex align-items-center "
                        style={{
                          backgroundColor: "#EEE",
                          width: "fit-content",
                          borderRadius: "40px",
                          fontSize: "15px",
                          gap: "6px",
                          marginBlock: "5px",

                          paddingInline: "12px",
                          lineHeight: "25px",
                        }}
                      >
                        <div>In cart: {products?.cartcount}</div>
                      </div>
                      <div
                        className="d-flex align-items-center "
                        style={{
                          backgroundColor: "#EEE",
                          width: "fit-content",
                          borderRadius: "40px",
                          fontSize: "15px",
                          gap: "6px",
                          marginBlock: "5px",

                          paddingInline: "12px",
                          lineHeight: "25px",
                        }}
                      >
                        <div>Place orders: {products?.ordercount}</div>
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
                      style={{ lineHeight: "5px" }}
                    >
                      <div className="imformation">
                        <p className="fs-6 fw-semibold bold ">
                          Product Details
                        </p>

                        <div className="table" style={{ fontSize: "12px" }}>
                          <div>
                            <tr>
                              <td>Product id</td>
                              <td>{products.productId}</td>
                            </tr>

                            <tr>
                              <td>Size</td>
                              <td>{products.size}</td>
                            </tr>
                            <tr>
                              <td>Frame Type</td>
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <p className="fs-5 ">Customer Reviews</p>
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
                    {products?.ratings ? (
                      <>
                        {products?.ratings?.map((i) => (
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
            <div className="container-fluid border">
              <div className="row row-col-3">
                <div className="col">
                  {products?.carts?.length > 0 ? (
                    <>
                      <p className="fs-5 ">
                        Added to cart by: {products.carts.length}
                      </p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">User name</th>
                            <th scope="col">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.carts.map((i, index) => {
                            return (
                              <>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {i.user.firstname} {i.user.lastname}
                                  </td>
                                  <td>{i.count}</td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {products?.wishlists?.length > 0 ? (
                  <>
                    <div className="col">
                      <p className="fs-5 ">
                        Wishlisted by: {products.wishlists.length}
                      </p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">User name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.wishlists.map((i, index) => {
                            return (
                              <>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {i?.firstname} {i?.lastname}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="col">
                  {products?.orders?.length > 0 ? (
                    <>
                      <p className="fs-5 ">
                        Order by: {products.orders.length}
                      </p>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">User name</th>
                            <th scope="col">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.carts.map((i, index) => {
                            return (
                              <>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {i.user.firstname} {i.user.lastname}
                                  </td>
                                  <td>{i.count}</td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
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
