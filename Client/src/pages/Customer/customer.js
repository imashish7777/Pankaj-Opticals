import React from "react";
import { Outlet } from "react-router-dom";
import "./customer.css";
import { Link } from "react-router-dom";

function Customer() {
  return (
    <div
      className="container-fluid py-3 "
      style={{ backgroundColor: "rgb(249, 249, 243)" }}
    >
      <div className="row">
        <div className="col-3 ms-5">
          <div
            style={{ backgroundColor: " rgb(246, 246, 246)" }}
            className="btn-group-vertical  account-toggle w-100 "
            role="group"
            aria-label="Vertical radio toggle button group"
          >
            <Link
              to="/customer"
              type="radio"
              className="btn account-toggle"
              name="vbtn-radio"
              id="vbtn-radio2"
              autoComplete="off"
            >
              Account information
            </Link>

            <Link
              to="address"
              type="radio"
              className="btn account-toggle"
              name="vbtn-radio"
              id="vbtn-radio3"
              autoComplete="off"
            >
              Address Book
            </Link>
          </div>
        </div>
        <div className="col-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Customer;
