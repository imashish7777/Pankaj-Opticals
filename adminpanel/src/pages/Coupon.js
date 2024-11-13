import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_COUPONS } from "../redux/features/product/couponSlice";
import CouponboxBasic from "../components/couponboxBasic.js";
import EmptyCouponbox from "../components/EmptyCouponbox";

function Coupon() {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(FETCH_COUPONS());
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
          <EmptyCouponbox edit={false} />
        </div>
        <div className=" row row-cols-3">
          {coupons?.CouponsItems.lenght !== -1 ? (
            <>
              {coupons.CouponsItems.map((i) => {
                return (
                  <div className="col">
                    <CouponboxBasic
                      name={i.name}
                      discount={i.discount}
                      upTo={i.upTo}
                      edit={false}
                      _id={i._id}
                      design={i.design}
                      discribtion={i.discribtion}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Coupon;
