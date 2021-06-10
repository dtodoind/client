import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ReviewSlider.scss";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

function ReviewSlider() {
  var slidesToShow;
  if (window.innerWidth <= 600) {
    slidesToShow = 1;
  } else if (window.innerWidth <= 900) {
    slidesToShow = 2;
  } else if (window.innerWidth <= 1200) {
    slidesToShow = 3;
  } else if (window.innerWidth <= 1800) {
    slidesToShow = 4;
  } else {
    slidesToShow = 5;
  }
  const [settings, setSettings] = useState({
    infinite: false,
    speed: 200,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    cssEase: "linear",
  });

  window.onresize = function () {
    if (window.innerWidth <= 600) {
      slidesToShow = 1;
    } else if (window.innerWidth <= 900) {
      slidesToShow = 2;
    } else if (window.innerWidth <= 1200) {
      slidesToShow = 3;
    } else if (window.innerWidth <= 1800) {
      slidesToShow = 4;
    } else {
      slidesToShow = 5;
    }
    setSettings({
      infinite: false,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToShow,
      cssEase: "linear",
    });
  };

  return (
    <div className="product_container">
      <Slider {...settings}>

        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </Slider>
    </div>
  );
}

export default ReviewSlider;
