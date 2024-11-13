import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../App.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiHeart3Fill } from "react-icons/ri";
import Loader from "../../component/loader";
import { Page500, PageInfo } from "../ResultPages/ResultPage";

import {
  FETCH_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../redux/features/product/wishlistSlice";
import { ADD_TO_CART } from "../../redux/features/product/cartSlice";

function Favorite() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FETCH_WISHLIST());
  }, []);

  return (
    <>
      {wishlist?.loading ? (
        <div style={{ paddingBlock: "14%" }}>
          <Loader />
        </div>
      ) : wishlist?.status > 400 ? (
        <Page500 />
      ) : wishlist.WishlistItems.length ? (
        <>
          <div className="favorite p-4 ">
            <h2 className="text-muted">WishList</h2>

            <div className="container-fluid">
              <div className="row row-cols-5">
                {wishlist.WishlistItems.map((Item) => (
                  <div key={Item.productId} className="col my-3">
                    <div className="product">
                      <RiHeart3Fill
                        className="heart active"
                        onClick={() =>
                          dispatch(
                            REMOVE_FROM_WISHLIST({ productId: Item._id })
                          )
                        }
                      />

                      <Link to={`/details/${Item._id}`}>
                        <div className="product-image-section">
                          <img
                            className="product-image"
                            src={Item.thumnailimages[0]?.url}
                          />
                        </div>
                      </Link>

                      <div className="product-details ">
                        <p className="fs-6 ">{Item.Brand}</p>
                        <p className="text-muted">
                          size:{Item.size} • {Item.color}
                        </p>
                        <p className="">₹{Item.mPrice}</p>
                        <p></p>
                        <p></p>
                        <p></p>
                      </div>

                      <button
                        type="button"
                        className=" btn btn-light addtocartButton my-2"
                        onClick={() => {
                          dispatch(
                            ADD_TO_CART({
                              productId: Item._id,
                              mPrice: Item.mPrice,
                            })
                          );
                          dispatch(
                            REMOVE_FROM_WISHLIST({ productId: Item._id })
                          );
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageInfo
            discription="Wishlist is Empty"
            buttonName="Continue Shippping?"
          />
        </>
      )}
    </>
  );
}

export default Favorite;
