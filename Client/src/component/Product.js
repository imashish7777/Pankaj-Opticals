import React, { useState } from "react";
import { RiHeart3Fill } from "react-icons/ri";
import "../CSS/product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_WISHLIST } from "../redux/features/product/wishlistSlice";
import { ADD_TO_CART } from "../redux/features/product/cartSlice";

function Product({
  _id,
  Brand,
  mPrice,
  totolratings,
  thumnailimages,

  size,
  color,
  ratings,
}) {
  // const Navigate = useNavigate();
  const [toggleHeart, setToggleHeart] = useState(false);
  const dispatch = useDispatch();

  // Add  and remove  wishlist

  const ToggelWishList = () => {
    setToggleHeart(!toggleHeart);
    if (!toggleHeart) {
      dispatch(
        ADD_TO_WISHLIST({
          productId: _id,
        })
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(
      ADD_TO_CART({
        productId: _id,
        mPrice: mPrice,
      })
    );
  };

  return (
    <div
      className="product "
      style={{
        borderRadius: "20px",
        backgroundColor: "white",
        boxShadow: "0px 0px 10px px rgba(176, 175, 175, 0.1)",
        border: "0",
      }}
    >
      <RiHeart3Fill
        className={toggleHeart ? "heart active" : "heart"}
        onClick={ToggelWishList}
      />

      <Link to={`/details/${_id}`}>
        <div className="product-image-section">
          <img className="product-image" src={thumnailimages[0]?.url} />
        </div>
      </Link>

      <div className="product-details ">
        <p className="fs-6 ">{Brand}</p>
        <p className="text-muted">
          size: {size} • {color}
        </p>
        <p className="">₹{mPrice}</p>
        <div
          className="d-flex align-items-center "
          style={{
            backgroundColor: "#EEE",
            width: "fit-content",
            borderRadius: "40px",
            fontSize: "15px",
            gap: "6px",

            paddingInline: "12px",
          }}
        >
          <div>{totolratings}</div>
          <div
            style={{
              color: "#ffc107",
              fontSize: "x-large",
            }}
          >
            &#9733;
          </div>
          <div
            style={{
              border: "1px solid grey",
              height: "20px",
              marginRight: "3px",
            }}
          ></div>

          <div style={{ color: "gray" }}>{ratings.length}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="btn addtocartButton"
      >
        <p style={{ color: "white" }}>Add to Cart</p>
      </button>
    </div>
  );
}

export default Product;
