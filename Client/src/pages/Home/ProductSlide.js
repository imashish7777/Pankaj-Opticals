import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Loader from "../../component/loader";

function ProductSlide({
  heading,
  Products,

  name,
}) {
  const navigate = useNavigate();

  if (Products) {
    const array = Products;
    if (array.length >= 8) {
      const midIndex = Math.floor(array.length / 2);
      var firstPart = array.slice(0, midIndex);
      var secondPart = array.slice(midIndex);
      var showSecond = true;
    } else {
      firstPart = array.slice(0, 5);
      showSecond = false;
    }
  }
  const handleOnclick = (productId) => {
    navigate(`/details/${productId}`);
  };

  return (
    <>
      <section className="slider-section ">
        <div className=" d-flex  align-items-center">
          <p
            className="slider-heading ms-5 fs-6 text-muted"
            style={{ whiteSpace: "nowrap", fontWeight: "normal" }}
          >
            {heading}
          </p>
        </div>

        <div id={name} className="carousel slide " data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <div className="slider-products">
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  {firstPart?.map((i, index) => {
                    return (
                      <>
                        <div
                          className="slider-product"
                          key={i._id}
                          onClick={() => handleOnclick(i._id)}
                        >
                          <img
                            src={i?.thumnailimages[0]?.url}
                            alt=""
                            key={i?.thumnailimages[0]?.public_id}
                          />
                          <div className="d-flex gap-5" key={i._id + index}>
                            <p>{i.Brand}</p>
                            <p className="text-muted">₹{i.mPrice}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            {showSecond ? (
              <>
                <div className="carousel-item" data-bs-interval="8000">
                  <div className="slider-products">
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                    >
                      {secondPart?.map((i) => {
                        return (
                          <>
                            <div className="slider-product">
                              <img src={i?.thumnailimages[0]?.url} />
                              <div className="d-flex gap-5">
                                <p>{i.Brand}</p>
                                <p className="text-muted">₹{i.mPrice}</p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev slider-button"
                  type="button"
                  data-bs-target={`#` + name}
                  data-bs-slide="prev"
                ></button>
                <button
                  className="carousel-control-next  slider-button"
                  type="button"
                  data-bs-target={`#` + name}
                  data-bs-slide="next"
                ></button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductSlide;
