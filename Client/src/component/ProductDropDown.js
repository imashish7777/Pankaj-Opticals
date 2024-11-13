import React from "react";
import { Link } from "react-router-dom";
import { sunglasses } from "./DDDetails";

function ProductDropDown({ name, name2, image }) {
  const list = Object.values(sunglasses);


  return (
    <>
      <div className="menu-buttom  d-flex align-items-center gap-15">
        <Link to={`products/${name}`}>
          <div className=" dropdown d-flex align-items-center border-0">
            <div
              className=" header-bottom-2-content-box   btn btn-secondary btn-lg  bg-white border-0  "
              type="button"
              aria-expanded="false"
            >
              <img className="header-content-images" src={image} />
              <p>{name2}</p>
            </div>
            <ul
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton1"
            >
              {list.map((index) => {
                return (
                  <li key={index.id}>
                    <div className="dropdown-item " >
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="  p-0 col-9">
                            <p className="fw-semibold">{index.title}</p>
                          </div>
                          <div className="  p-0 col-3">
                            <p>starting</p>
                          </div>
                        </div>
                        <div className="row ">
                          <div className=" p-0 col-9">
                            <p>{index.text}</p>
                          </div>
                          <div className=" p-0 col-3">
                            <p className="fw-semibold">₹{index.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              <li>
                <div className="dropdown-item " to="/">
                  <div className="container-fluid text-black">View All</div>
                </div>
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProductDropDown;
