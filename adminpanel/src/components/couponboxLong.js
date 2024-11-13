import React from "react";
import "../CSS/couponboxVertical";
function couponboxVertical({ name, discount, upTo }) {
  return (
    <>
      <section id="labels">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <div className="dl">
                <div className="brand">
                  <h2>Discount</h2>
                </div>
                <div className="discount alizarin">
                  {discount}%<div className="type">off</div>
                </div>
               
                <div className="ends">
                  <small>Up to ₹{upTo} on minimum purchase ₹0.</small>
                </div>
                <div className="coupon midnight-blue">
                  <a
                    data-toggle="collapse"
                    href="#code-1"
                    className="open-code"
                  >
                    Get a code
                  </a>
                  <div id="code-1" className="collapse code">
                    {name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default couponboxVertical;
