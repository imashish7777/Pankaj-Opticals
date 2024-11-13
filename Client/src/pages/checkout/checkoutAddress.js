import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAddress,
  fetchaddress,
} from "../../redux/features/product/addressSlice";
import { useEffect } from "react";
import CheckoutAddressbox from "./checkoutAddressBox";
import { useOutletContext } from "react-router-dom";

function CheckoutAddress() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address);
  const [{ setAdddressId }] = useOutletContext();

  useEffect(() => {
    dispatch(fetchaddress());
  }, []);

  return (
    <>
      <p className="fs-3">Select address</p>
      <form className="form-check  gap-5 p-0">
        {addresses && addresses.addresses.length ? (
          addresses.addresses.map((i) => {
            return (
              <>
                <label
                  className="text-dark fs-6 form-check p-3 d-flex gap-3 align-items-center mb-4"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#F0FCF8",
                    boxShadow: "0px 0px 2px 2px rgba(176, 175, 175, 0.1)",
                    border: "0",
                  }}
                  htmlFor={i._id}
                >
                  <input
                    type="radio"
                    className="form-check-input ms-3   "
                    name="address"
                    id={i._id}
                    value={i._id}
                    onChange={() => {
                      setAdddressId(i._id);
                    }}
                    style={{ height: "20px", width: "20px" }}
                  ></input>
                  <div className=" me-4">
                    <div className="fs-5">
                      {i.firstname} {i.lastname}
                    </div>
                    <hr></hr>
                    {i.addresslineOne}, {i.addresslineTwo}, {i.city}, {i.state},{" "}
                    {i.zip}, INDIA, {i.phone}
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteAddress(i._id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </label>
              </>
            );
          })
        ) : (
          <>
            <CheckoutAddressbox edit="true" save="true" show="true" />
          </>
        )}
      </form>
      {addresses && addresses.addresses.length === 0 ? (
        <></>
      ) : (
        <>
          <CheckoutAddressbox save="true" show="true" />
        </>
      )}
    </>
  );
}

export default CheckoutAddress;
