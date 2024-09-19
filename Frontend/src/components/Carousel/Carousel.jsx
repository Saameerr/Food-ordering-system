import React from "react";
import "./Carousel.css";

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel-container">
        <img src="img3.jpg" alt="Slide 1" className="carousel-image" />
        <img src="img4.jpg" alt="Slide 2" className="carousel-image" />
        <img src="img5.jpg" alt="Slide 3" className="carousel-image" />
        <img src="img6.jpg" alt="Slide 4" className="carousel-image" />

        {/* Duplicate the images */}
        <img src="img3.jpg" alt="Slide 1" className="carousel-image" />
        <img src="img4.jpg" alt="Slide 2" className="carousel-image" />
        <img src="img5.jpg" alt="Slide 3" className="carousel-image" />
        <img src="img6.jpg" alt="Slide 4" className="carousel-image" />
      </div>
    </div>
  );
};

export default Carousel;
