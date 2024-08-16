import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import '../../src/index.css'


export default function Carousel({ slides }) {
    let imgURI = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow : prevArrow(),
        nextArrow: nextArrow(),
    };

    function nextArrow () {
        return (
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
        )
    }

    function prevArrow () {
        return (
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        )
    }
    return (
        <div className="w-full max-w-6xl mx-auto mt-8">
          <Slider {...settings}>
            {slides.map((card, index) => (
              <div key={index} className="p-2">
                <div className="bg-white  overflow-hidden">
                  <img src={imgURI+card.imageId} alt={card.title} className="w-full object-cover" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      );
}