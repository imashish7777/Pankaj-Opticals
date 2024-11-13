import React from "react";
import { useState, useEffect } from "react";
import ProductSlide from "./ProductSlide";
import axios from "axios";
function Home() {
  const [Eyeglasses, setEyeglasses] = useState();
  const [Sunglasses, setSunglasses] = useState();
  const [ComputerGlasses, setComputerGlasses] = useState();
  const [FemaleEyeglasses, setFemaleEyeglasses] = useState();
  const [FemaleSunglasses, setFemaleSunglasses] = useState();

  //fetch men's eyeglasses
  const fetchEyeglasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/fetchhomeproducts/eyeglasses/male`
      );

      var postData = await response.json();
      setEyeglasses(postData);
    } catch (error) {
    }
  };
  //fetch men's sunglasses
  const fetchSunglasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/fetchhomeproducts/sunglasses/male`
      );

      var postData = await response.json();
      setSunglasses(postData);
    } catch (error) {
    }
  };
  //fetch computerglasses
  const fetchComputerglasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/fetchhomeproducts/computerglasses/male`
      );

      var postData = await response.json();
      setComputerGlasses(postData);
    } catch (error) {
    }
  };

  //female eyeglasses
  const fetchFemaleEyeglasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/fetchhomeproducts/eyeglasses/female`
      );

      var postData = await response.json();
      setFemaleEyeglasses(postData);
    } catch (error) {
    }
  };

  //female sunglasses
  const fetchFemaleSunglasses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/product/fetchhomeproducts/sunglasses/female`
      );

      var postData = await response.json();
      setFemaleSunglasses(postData);
    } catch (error) {
    }
  };

  const isAuthticated = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3001/auth/isAuthicated`,

        headers: {
          "x-auth-token": window.localStorage.getItem("token"),
        },
      });

      if (response.data === "true") {
        window.localStorage.setItem("user", "true");
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      }
    } catch (error) {
      window.localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    isAuthticated();
    fetchEyeglasses();
    fetchSunglasses();
    fetchComputerglasses();
    fetchFemaleEyeglasses();
    fetchFemaleSunglasses();
  }, []);
  return (
    <>
      <div className="home mt-5">
        {Eyeglasses?.length > 0 ? (
          <>
            <div className="ProductSlide">
              <ProductSlide
                name="first"
                heading="EYEGLASSES"
                Products={Eyeglasses}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {Sunglasses?.length > 0 ? (
          <>
            <div className="ProductSlide">
              <ProductSlide
                Products={Sunglasses}
                name="second"
                heading="SUNGLASSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {FemaleEyeglasses?.length > 0 ? (
          <>
            <div className="ProductSlide">
              <ProductSlide
                Products={FemaleEyeglasses}
                name="third"
                heading="WOMEN'S EYEGLASSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {FemaleSunglasses?.length > 0 ? (
          <>
            <div className="ProductSlide">
              <ProductSlide
                Products={FemaleSunglasses}
                name={"forth"}
                heading="WOMEN'S SUNGLASSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {Eyeglasses?.length > 0 ? (
          <>
            <div className="productSlide">
              <ProductSlide
                Products={Eyeglasses}
                name="fifth"
                heading="EYEGLASSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {FemaleEyeglasses?.length > 0 ? (
          <>
            <div className="productSlide">
              <ProductSlide
                Products={FemaleEyeglasses}
                name="six"
                heading="WOMEN'S EYEGLASSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {/* <div className="productSlide">
        <ProductSlide
          Products={ComputerGlasses}
          name="seven"
          heading="WITH POWER COMPUTER BLU LENSES"
        />
      </div> */}
        {ComputerGlasses?.length > 0 ? (
          <>
            <div className="productSlide">
              <ProductSlide
                Products={ComputerGlasses}
                name="eight"
                heading="WITH ZERO POWER COMPUTER BLU LENSES"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Home;
