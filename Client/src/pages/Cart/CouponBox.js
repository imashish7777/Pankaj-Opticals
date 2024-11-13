import React, { useState, useEffect } from "react";
import "../../CSS/cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLY_COUPON,
  REMOVE_COUPON,
} from "../../redux/features/product/cartSlice";
import { formik, Formik, Field, Form } from "formik";

function CouponBox({ CouponApplied }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(APPLY_COUPON(values));
  };
  if(CouponApplied===null){
    alert("invalid")
  }

  const handleRemoveCoupon = (e) => {
    dispatch(REMOVE_COUPON());
  };

  const initialValues = {
    coupon: "",
  };

  return (
    <>
      {CouponApplied ? (
        <div className="alert alert-primary" role="alert">
          Coupon Applied! {CouponApplied.name}
          <button className="btn border-0" onClick={handleRemoveCoupon}>
            X
          </button>
        </div>
      ) : (
        <>
          <Formik
            className=" mb-3 py-3 offer border-0"
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            <Form>
              <p className="fs-6 text-center">Apply Coupon</p>
              <div className="input-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Enter Coupon code..."
                  aria-label="Coupon"
                  aria-describedby="button-addon2"
                  name="coupon"
                />
                <button
                  className="btn couponCodeButton"
                  type="submit"
                  id="button-addon2"
                >
                  Apply
                </button>
              </div>
            </Form>
          </Formik>
        </>
      )}
    </>
  );
}

export default CouponBox;
