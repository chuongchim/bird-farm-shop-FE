import * as React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Slider1 from '../../../assets/img/slider-bird1.jpg'
import Slider2 from '../../../assets/img/slider-bird2.jpg'
import Slider3 from '../../../assets/img/slider-bird3.jpg'

const  SliderComponent =() => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={Slider1} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Slider1} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Slider1} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderComponent;