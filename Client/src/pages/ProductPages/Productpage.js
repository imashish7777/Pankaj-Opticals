import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Product from "../../component/Product";
import "../../CSS/productpage.css";
import { useParams } from "react-router-dom";
import Loader from "../../component/loader";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_PRODUCTS } from "../../redux/features/product/productSlice";
import { FETCH_PROPERTIES } from "../../redux/features/product/propertiesSlice";
import { Pagination } from "antd";
import { Select, Space, Switch } from "antd";
import { Tag } from "antd";

const Filter = forwardRef(
  (
    {
      handleFrameType,
      handleBrand,
      handleColor,
      handleSize,
      handleShape,
      handleGender,
      brands,
      colors,
      frameTypes,
      sizes,
      shapes,
      genders,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      getUncheck(value) {
        const element = document.getElementById(value);
        element.checked = false;
      },
    }));
    return (
      <div
        className="filter"
        style={{ borderRight: "1px solid lightgrey", marginTop: "-16px" }}
      >
        <form className="container">
          <div className="row">
            <p>FRAME TYPE</p>
            {frameTypes?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleFrameType}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>

          <div className="row">
            <p> SHAPE</p>
            {shapes?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleShape}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>
          <div className="row ">
            <p>BRAND</p>
            {brands?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleBrand}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>
          <div className="row ">
            <p>SIZE</p>
            {sizes?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleSize}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>
          <div className="row ">
            <p>COLOR</p>
            {colors?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleColor}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>

          <div className="row ">
            <p>GENDER</p>
            {genders?.map((i, index, value) => {
              return (
                <>
                  <label key={value[index]}>
                    <input
                      type="checkbox"
                      name={value[index]}
                      value={value[index]}
                      onClick={handleGender}
                      id={value[index]}
                    />
                    <span> {value[index]}</span>
                  </label>
                </>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
);

///filter

export default function Productpage() {
  const dispatch = useDispatch();
  const refElement = useRef();
  ///product data///
  const Products = useSelector((state) => state.product);
  const [current, setCurrent] = useState(1);

  const showingCount = Products?.limit;
  const lowerbound = (current - 1) * showingCount + 1;
  const upperbound = lowerbound + showingCount - 1;
  let { name } = useParams();

  var [frameType, setFrameType] = useState([]);
  var [shape, setShape] = useState([]);
  var [Brand, setBrand] = useState([]);
  var [gender, setGender] = useState([]);
  var [size, setSize] = useState([]);
  var [color, setColor] = useState([]);

  var [sortby, setSortby] = useState();

  //antd pagination//
  const onChange = (page) => {
    setCurrent(page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  ///fetcch properties//

  const properties = useSelector((state) => state.properties);

  if (properties?.properties?.length > 0) {
    var brands = properties.properties[0].brands;
    var colors = properties.properties[0].colors;
    var frameTypes = properties.properties[0].frameTypes;
    var sizes = properties.properties[0].sizes;
    var shapes = properties.properties[0].shapes;
    var genders = properties.properties[0].genders;

    //convert all arrays into single array of objects for search antd autocompelet options,array of objects would be like this
    //{ label: value of array,
    // value: value of array,
    //}
    var optionArray = brands?.concat(frameType, sizes, shapes, genders, colors);
    var options = optionArray.map((i) => {
      return {
        label: i,
        value: i,
      };
    });
  }

  const handleChange = (value) => {
    setSortby(value);
    setCurrent(1);
  };

  const handleGender = (e) => {
    setCurrent(1);

    let updatedList = [...gender];

    if (e.target.checked) {
      updatedList = [...gender, { gender: e.target.value }];

      setGender({ gender: e.target.value });
    } else {
      updatedList.splice(
        gender.findIndex((i) => i.gender === e.target.value),
        1
      );
    }

    setGender(updatedList);
  };

  const handleFrameType = (e) => {
    setCurrent(1);
    let updatedList = [...frameType];

    if (e.target.checked) {
      updatedList = [...frameType, { frameType: e.target.value }];

      setFrameType({ frameType: e.target.value });
    } else {
      updatedList.splice(
        frameType.findIndex((i) => i.frameType === e.target.value),
        1
      );
    }

    setFrameType(updatedList);
  };

  const handleShape = (e) => {
    setCurrent(1);
    let updatedList = [...shape];
    if (e.target.checked) {
      updatedList = [...shape, { shape: e.target.value }];
      setShape({ shape: e.target.value });
    } else {
      updatedList.splice(
        shape.findIndex((i) => i.shape === e.target.value),
        1
      );
    }
    setShape(updatedList);
  };

  const handleBrand = (e) => {
    setCurrent(1);
    var updatedList = [...Brand];
    if (e.target.checked) {
      setBrand({ Brand: e.target.value });
      updatedList = [...Brand, { Brand: e.target.value }];
    } else {
      updatedList.splice(
        Brand.findIndex((i) => i.Brand === e.target.value),
        1
      );
    }
    setBrand(updatedList);
  };
  const handleColor = (e) => {
    setCurrent(1);
    var updatedList = [...color];
    if (e.target.checked) {
      setColor({ color: e.target.value });
      updatedList = [...color, { color: e.target.value }];
    } else {
      updatedList.splice(
        color.findIndex((i) => i.color === e.target.value),
        1
      );
    }
    setColor(updatedList);
  };

  const handleSize = (e) => {
    setCurrent(1);
    var updatedList = [...size];
    if (e.target.checked) {
      setSize({ size: e.target.value });
      updatedList = [...size, { size: e.target.value }];
    } else {
      updatedList.splice(
        size.findIndex((i) => i.size === e.target.value),
        1
      );
    }
    setSize(updatedList);
  };

  const handleUncheckSize = (value) => {
    setCurrent(1);
    var updatedList = [...size];

    updatedList.splice(
      size.findIndex((i) => i.size === value),
      1
    );

    setSize(updatedList);
    refElement.current.getUncheck(value);
  };
  const handleUncheckShape = (value) => {
    setCurrent(1);
    var updatedList = [...shape];

    updatedList.splice(
      shape.findIndex((i) => i.shape === value),
      1
    );

    setShape(updatedList);
    refElement.current.getUncheck(value);
  };
  const handleUncheckBrand = (value) => {
    setCurrent(1);
    var updatedList = [...Brand];

    updatedList.splice(
      Brand.findIndex((i) => i.Brand === value),
      1
    );

    setBrand(updatedList);
    refElement.current.getUncheck(value);
  };
  const handleUncheckGender = (value) => {
    setCurrent(1);
    var updatedList = [...gender];

    updatedList.splice(
      gender.findIndex((i) => i.gender === value),
      1
    );

    setGender(updatedList);
    refElement.current.getUncheck(value);
  };
  const handleUncheckColor = (value) => {
    setCurrent(1);
    var updatedList = [...color];

    updatedList.splice(
      color.findIndex((i) => i.color === value),
      1
    );

    setColor(updatedList);
    refElement.current.getUncheck(value);
  };

  const handleUncheckFrameType = (value) => {
    setCurrent(1);
    var updatedList = [...frameType];

    updatedList.splice(
      frameType.findIndex((i) => i.frameType === value),
      1
    );

    setFrameType(updatedList);
    refElement.current.getUncheck(value);
  };

  // const handleRemoveSearch = () => {
  //    var {name} = "";
  // };

  if (name === "menssunglasses") {
    var category = [{ category: "sunglasses" }];
  } else if (name === "womenssunglasses") {
    var category = [{ category: "sunglasses" }];
  } else if (name === "eyeglasses") {
    var category = [{ category: "eyeglasses" }];
  } else if (name == "sunglasses") {
    var category = [{ category: "sunglasses" }];
  } else if (name === "contactlens") {
    var category = [{ category: "contactlens" }];
  } else {
    var category = [];
  }

  var searchObj = {
    searchstring: name,
    frameType: frameType,
    shape: shape,
    Brand: Brand,
    size: size,
    gender: gender,
    color: color,
    current: current,
    sortby: sortby,
    category: category,
  };

  // /fetchproducts/; ///
  useEffect(() => {
    dispatch(FETCH_PRODUCTS(searchObj));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [frameType, shape, Brand, color, gender, size, current, sortby, name]);

  useEffect(() => {
    dispatch(FETCH_PROPERTIES());
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div
          className="row"
          style={{
            backgroundColor: "rgb(250, 250, 250)",
            display: "flex",
          }}
        >
          <div className="col-2"></div>
          <div className="col-7"></div>
        </div>

        <div>
          <p>
            showing {lowerbound}-{" "}
            {upperbound < Products?.count ? upperbound : Products?.count} of
            over {Products?.count} for{" "}
            <span style={{ color: "Brown" }}>
              {name === "menssunglasses"
                ? "men's sunglases"
                : name === "womenssunglasses"
                ? "women's sunglasses"
                : name}{" "}
            </span>
          </p>
          {/* <Tag closeIcon onClose={() => handleRemoveSearch()}>
            Remove Search
          </Tag> */}
        </div>

        <div
          className="row d-flex "
          style={{
            marginBottom: "-15px",
            backgroundColor: "rgb(250, 250, 250)",
            marginTop: "10px",
          }}
        >
          <div className="col-2">
            <p style={{ fontSize: "16px", position: "sticky" }}>FILTER</p>
          </div>
          <div className="col-7">
            {Brand?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.Brand}
                    closeIcon
                    onClose={() => handleUncheckBrand(i.Brand)}
                  >
                    {i.Brand}
                  </Tag>
                </>
              );
            })}
            {frameType?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.frameType}
                    closeIcon
                    onClose={() => handleUncheckFrameType(i.frameType)}
                  >
                    {i.frameType}
                  </Tag>
                </>
              );
            })}{" "}
            {color?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.color}
                    closeIcon
                    onClose={() => handleUncheckColor(i.color)}
                  >
                    {i.color}
                  </Tag>
                </>
              );
            })}{" "}
            {size?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.size}
                    closeIcon
                    onClose={() => handleUncheckSize(i.size)}
                  >
                    {i.size}
                  </Tag>
                </>
              );
            })}{" "}
            {shape?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.shape}
                    closeIcon
                    onClose={() => handleUncheckShape(i.shape)}
                  >
                    {i.shape}
                  </Tag>
                </>
              );
            })}{" "}
            {gender?.map((i) => {
              return (
                <>
                  <Tag
                    key={i.gender}
                    closeIcon
                    onClose={() => handleUncheckGender(i.gender)}
                  >
                    {i.gender}
                  </Tag>
                </>
              );
            })}
          </div>{" "}
          <div
            className=" col-3  d-flex mb-2"
            style={{
              height: "23px",
              position: "sticky",
              fontSize: "12px",
            }}
          >
            <p className="fs-6 me-2"> Sort By:</p>
            <Select
              defaultValue="Recommanded"
              label="Recommanded"
              style={{ width: "70%" }}
              onChange={handleChange}
              options={[
                {
                  value: "R",
                  label: "Recommanded",
                },
                {
                  value: "HtL",
                  label: "High to Low",
                },

                {
                  value: `LtH`,
                  label: "Low to High",
                },
                {
                  value: `WN`,
                  label: "What's New",
                },
                {
                  value: `CR`,

                  label: "Customer Ratings",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <hr></hr>
        <div
          className="row"
          style={{
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <div className="col-2" style={{ position: "sticky" }}>
            <Filter
              handleBrand={handleBrand}
              handleFrameType={handleFrameType}
              handleShape={handleShape}
              handleGender={handleGender}
              handleColor={handleColor}
              handleSize={handleSize}
              brands={brands}
              colors={colors}
              frameTypes={frameTypes}
              sizes={sizes}
              shapes={shapes}
              genders={genders}
              ref={refElement}
            />
          </div>
          <div className="products col-10">
            <div className="container-fluid">
              <div className="row row-cols-4">
                {Products?.ProductsItems?.length !== -1 ? (
                  Products?.ProductsItems?.map((i, index) => {
                    return (
                      <div key={index} className="col my-3">
                        <Product
                          name={name}
                          _id={i._id}
                          id={i?.productId}
                          Brand={i?.Brand}
                          mPrice={i?.mPrice}
                          size={i?.size}
                          thumnailimages={i?.thumnailimages}
                          frameType={i?.frameType}
                          color={i?.color}
                          shape={i?.shape}
                          totolratings={i?.totolratings}
                          ratings={i?.ratings}
                          quantity={i?.quantity}
                          productId={i?.productId}
                          gender={i?.gender}
                        />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <Loader />
                  </>
                )}
              </div>
            </div>
            <div className="py-4">
              <Pagination
                style={{ width: "fit-content", marginInline: "auto" }}
                current={current}
                onChange={onChange}
                total={Products?.count}
                pageSize={20}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
