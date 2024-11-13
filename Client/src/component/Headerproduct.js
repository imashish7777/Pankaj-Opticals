import React from "react";
import ProductDropDown from "./ProductDropDown";
function Headerproduct() {
  return (
    <header className="header-bottom-2 py-2 ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ProductDropDown
              name="eyeglasses"
              name2="Eyeglasses"
              image="https://static1.lenskart.com/media/desktop/img/Apr22/a2.png"
            />
          </div>
          <div className="col-2">
            <ProductDropDown
              name="sunglasses"
              name2="Sunglasses"
              image="https://static1.lenskart.com/media/desktop/img/Apr22/b2.png"
            />
          </div>
          <div className="col-2">
            <ProductDropDown
              name="computerglasses"
              name2="Computer Glasses"
              image="https://static1.lenskart.com/media/desktop/img/Apr22/d2.png"
            />
          </div>
          <div className="col-2">
            <ProductDropDown
              name="contactlens"
              name2="Contact Lens"
              image="https://static1.lenskart.com/media/desktop/img/Apr22/d.png"
            />
          </div>
          <div className="col-2">
            <ProductDropDown
              name="powersunglasses"
              name2="Power Sunglasses"
              image="https://static1.lenskart.com/media/desktop/img/Apr22/e2.png"
            />
          </div>
          <div className="col-2">
            <ProductDropDown
              name="progressivelens"
              name2="Progressive Lens"
              image="https://static1.lenskart.com/media/desktop/img/June22/prog11.jpg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Headerproduct;
