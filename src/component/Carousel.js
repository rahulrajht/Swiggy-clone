import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import '../../src/index.css'


export default function Carousel({ slides = [], renderItem, slideToShow }) {  

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slideToShow,
    arrows: true,
    prevArrow: prevArrow(),
    nextArrow: nextArrow(),
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          center:true
        },
      },
    ],
  };


  function nextArrow() {
    return (
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    )
  }

  function prevArrow() {
    return (
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    )
  }
  return (
    <div className="w-full  mx-auto mt-8">
      <Slider {...settings}>
        {slides.length > 0 ? slides.map((card, index) => (
          <div key={index}>
            {(renderItem(card))}
          </div>
        )) : null}
      </Slider>
    </div>
  );
}