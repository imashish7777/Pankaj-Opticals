import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

function SimilarProduct({
  _id,
  Brand,
  mPrice,
  totolratings,
  thumnailimages,

  size,
  color,
  ratings,
  shape,
}) {
  // const Navigate = useNavigate();

  // Add  and remove  wishlist

  return (
    <div
      className="similarproduct "
      style={{
        borderRadius: "20px",
        backgroundColor: "white",
        boxShadow: "0px 0px 10px 10px rgba(176, 175, 175, 0.1)",
        height: "fit-content",
        overflow: "hidden",
      }}
    >
      <Link to={`/details/${_id}`}>
        <div className="similarproduct-image-section">
          <img
            style={{
              margin: "-40px 9px -50px 9px",
              width: "90%",
            }}
            src={thumnailimages.url}
          />
        </div>
      </Link>

      <div className="similarProduct-details " style={{ marginTop: "-20px" }}>
        {ratings > 0 ? (
          <>
            {[...Array(ratings)].map((i, index) => {
              return (
                <>
                  <span
                    key={nanoid()}
                    style={{ fontSize: "100%", color: "#ffc107" }}
                  >
                    &#9733;
                  </span>
                </>
              );
            })}
          </>
        ) : (
          <>
            {[...Array(5)].map((i, index) => {
              return (
                <>
                  <span
                    key={nanoid()}
                    style={{ fontSize: "100%", color: "lightgray" }}
                  >
                    &#9733;
                  </span>
                </>
              );
            })}
          </>
        )}
        <p style={{ fontSize: "13px", marginTop: "5px" }}>{Brand}</p>
        <p className="text-muted">
          size: {size} • {color}
        </p>
        <p className="">₹{mPrice}</p>
      </div>
    </div>
  );
}

export default SimilarProduct;
