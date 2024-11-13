import React from "react";

function ProductAds({ image1, image2, image3, image4, image5, image6,image7,image8,image9,image10 }) {
  return (
    <section className="slider-section">
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image1} className="d-block " alt="..." />
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image2} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image3} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image4} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image5} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image6} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image7} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image8} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image9} className="d-block " alt="..." />
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <div className="Product-slider">
              <img src={image10} className="d-block " alt="..." />
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default ProductAds;
