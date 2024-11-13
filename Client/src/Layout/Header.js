import React, { lazy, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoGitCompareOutline } from "react-icons/io5";
import { BsHeart, BsCart } from "react-icons/bs";

import { AutoComplete, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { FETCH_PROPERTIES } from "../redux/features/product/propertiesSlice";
import { useNavigate } from "react-router-dom";
const Login = lazy(() => import("../modals/Login"));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector((state) => state.properties);

  if (properties?.properties?.length > 0) {
    var brands = properties.properties[0].brands;
    var categories = properties.properties[0].categories;
    var colors = properties.properties[0].colors;
    var frameTypes = properties.properties[0].frameTypes;
    var sizes = properties.properties[0].sizes;
    var shapes = properties.properties[0].shapes;
    var genders = properties.properties[0].genders;

    //convert all arrays into single array of objects for search antd autocompelet options,array of objects would be like this
    //{ label: value of array,
    // value: value of array,
    //}
    var optionArray = brands?.concat(
      categories,
      frameTypes,
      sizes,
      shapes,
      genders,
      colors
    );
    var options = optionArray.map((i) => {
      return {
        label: i,
        value: i,
      };
    });
  }
  var [word, setWord] = useState([]);
  const [value, setValue] = useState("");
  const [finaloptions, setFinaloptions] = useState();

  function scramble(string1, string2) {
    return string2.split("").every(function (character) {
      return string1.includes(character);
    });
  }
  const handlefilter = (word) => {
    var finaloptions = options?.filter((i) =>
      scramble(i.label?.toLowerCase(), word[0]?.toLowerCase())
    );
    setFinaloptions(finaloptions);
  };
  const handleSearch = (value) => {
    const word = value?.split(" ").splice(-1);
    if (word) {
      setWord(word[0]);

      setValue(value);
      handlefilter(word);
    }
  };

  const onSelect = (selectvalue) => {
    let value1 = value?.split(" ");
    value1[value1.length - 1] = selectvalue;
    value1 = value1.join(" ");

    setValue(value1);
  };
  const handleSearchClick = () => {
    if (value?.length > 0) {
      navigate(`/products/${value}`);
    }
  };
  useEffect(() => {
    dispatch(FETCH_PROPERTIES());
  }, []);

  return (
    <>
      {/* Header part 1 start here */}

      <header className="header-upper">
        <div className="header-logo">
          <Link to="/">
            <img src="https://res.cloudinary.com/pankajoptical/image/upload/v1709921004/pankajoptical_LOGO_ielprm.png" />
          </Link>
        </div>
        <div></div>
        <div className="header-searchbar">
          <Input.Group compact>
            <AutoComplete
              style={{
                width: "90%",
              }}
              value={value}
              options={value ? finaloptions : []}
              onSelect={onSelect}
              onChange={handleSearch}
              size="large"
              
            ></AutoComplete>
            <Button
              icon={<SearchOutlined />}
              style={{ height: "140%", width: "10%" }}
              onClick={handleSearchClick}
            ></Button>
          </Input.Group>
        </div>
        <div className="header-links">
          <Login />
          <Link to="/orders">
            <IoGitCompareOutline className="header-icons" />

            <p style={{ fontSize: "11px" }}>
              Orders<br></br>& Returns
            </p>
          </Link>
          <Link to="/favorite">
            <BsHeart className="header-icons" />
            <p style={{ fontSize: "11px" }}>Wishlist</p>
          </Link>

          <Link to="/cart">
            <BsCart className="header-icons" />
            <p style={{ fontSize: "11px" }}>Cart</p>
          </Link>
        </div>
      </header>

      {/* Header part 2 Start Here */}

      <header className="header-bottom ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="menu-buttom  d-flex align-items-center gap-30">
                <div className="dropdown d-flex align-items-center">
                  <Link to="products/eyeglasses">
                    <button
                      className="btn  bg-transparent border-0"
                      type="button"
                    >
                      EyeGlasses
                    </button>
                  </Link>
                </div>
                <div className="dropdown d-flex align-items-center">
                  <Link to="products/sunglasses">
                    <button
                      className="btn  btn-lg bg-transparent border-0"
                      type="button"
                    >
                      SunGlasses
                    </button>
                  </Link>
                </div>
                <div className="dropdown d-flex align-items-center">
                  <Link to="products/computerglasses">
                    <button
                      className="btn  btn-lg  bg-transparent border-0"
                      type="button"
                    >
                      Computer Glaasses
                    </button>
                  </Link>
                </div>

                <div className="dropdown d-flex align-items-center">
                  <Link to="products/menssunglasses">
                    <button
                      className="btn  btn-lg bg-transparent border-0"
                      type="button"
                    >
                      Men's SunGlasses
                    </button>
                  </Link>
                </div>
                <div className="dropdown d-flex align-items-center">
                  <Link to="products/womenssunglasses">
                    <button
                      className="btn btn-lg  bg-transparent border-0"
                      type="button"
                    >
                      Women's SunGlasses
                    </button>
                  </Link>
                </div>

                <div className="dropdown d-flex align-items-center">
                  <Link to="products/contactlens">
                    <button
                      className="btn  btn-lg bg-transparent border-0"
                      type="button"
                    >
                      Contact Lens
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
