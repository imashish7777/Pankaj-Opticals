import React from "react";
import { useOutletContext } from "react-router-dom";

function Payment() {
  const [{ setMethod }] = useOutletContext();

  return (
    <>
      <div className="container-fluid">
        <p className="fs-4">Payment methods</p>
        <div className="row">
          <div className="col-11 gap-5">
            <label
              className="form-check paymentType w-100  my-4  p-4 "
              htmlFor="COD"
            >
              <input
                className="form-check-input mx-3 "
                type="radio"
                name="flexRadioDefault"
                id="COD"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              Cash on delivary
            </label>

            {/* collapse  google pay*/}

            <label
              className="form-check paymentType w-100 my-4 "
              htmlFor="phonepay"
            >
              <div className="row">
                <buttton
                  data-bs-toggle="collapse"
                  href="#Googlepay"
                  role="radio"
                  aria-expanded="false"
                  aria-controls="googlepay"
                  value="googlpay"
                  className=" p-4"
                  onChange={(e) => setMethod("Google Pay")}
                >
                  <img
                    src="
              https://w7.pngwing.com/pngs/667/120/png-transparent-google-pay-2020-hd-logo-thumbnail.png"
                    className="paymentType-logo "
                    alt=""
                  />
                  Google pay
                </buttton>
              </div>
              <div className="collapse " id="Googlepay">
                <div className="card card-body border-0"></div>
              </div>
            </label>
            {/* collapse */}

            {/* collapse phone pay  */}
            <label
              className="form-check paymentType w-100 my-4 "
              htmlFor="phonepay"
            >
              <div className="row">
                <buttton
                  data-bs-toggle="collapse"
                  href="#phonepay"
                  role="radio"
                  aria-expanded="false"
                  aria-controls="phonepay"
                  value="phonepay"
                  className=" p-4"
                  onChange={(e) => setMethod("Phone Pay")}
                >
                  <img
                    src="
                https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text-thumbnail.png"
                    className="paymentType-logo "
                    alt=""
                  />
                  Phone pay
                </buttton>
              </div>
              <div className="collapse " id="phonepay">
                <div className="card card-body border-0"></div>
              </div>
            </label>

            {/* collapse */}
            {/* collapse UPI */}
            <label className="form-check paymentType w-100 my-4 " htmlFor="UPI">
              <div className="row">
                <buttton
                  data-bs-toggle="collapse"
                  href="#UPI"
                  role="radio"
                  aria-expanded="false"
                  aria-controls="UPI"
                  value="UPI"
                  className=" p-4"
                  onChange={(e) => setMethod("UPI")}
                >
                  <img
                    src="
                https://w7.pngwing.com/pngs/795/596/png-transparent-logo-line-angle-brand-line-angle-triangle-logo-thumbnail.png"
                    className="paymentType-logo"
                    alt=""
                  />
                  UPI
                </buttton>
              </div>
              <div className="collapse " id="UPI">
                <div className="card card-body border-0"></div>
              </div>
            </label>

            {/* collapse */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
