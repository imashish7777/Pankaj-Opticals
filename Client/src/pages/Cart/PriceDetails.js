import React, { useState } from "react";
import "../../CSS/cart.css";

function PriceDetails({ totalPrice, totalAfterDiscount }) {
  return (
    <>
      <div className="pricedetails p-4 mb-3">
        <div className="container-fluid">
          <div className="row">
            <table>
              <tbody>
                <tr>
                  <td>Item total</td>
                  <td>₹{totalPrice}</td>
                </tr>
                {totalAfterDiscount ? (
                  <tr>
                    <td> Coupon Discount</td>
                    <td className="text-primary">
                      -₹{totalPrice - totalAfterDiscount}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}

                {totalAfterDiscount ? (
                  <tr>
                    <td>Net AMount</td>
                    <td>
                      ₹{totalAfterDiscount}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                

                <tr>
                  <td>Total Payable</td>
                  <td>
                    ₹{totalAfterDiscount ? totalAfterDiscount : totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceDetails;
