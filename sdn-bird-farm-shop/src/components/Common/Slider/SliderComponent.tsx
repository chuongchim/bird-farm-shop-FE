import React, { useState, useEffect } from 'react';

import Slider1 from '../../../assets/img/slider-bird1.jpg';
import Slider2 from '../../../assets/img/slider-bird3.jpg';
import Slider3 from '../../../assets/img/slider-bird1.jpg';

import './SliderComponent.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { bool } from 'prop-types';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const SliderComponent: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState<number>(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  // Next/previous controls
  function plusSlides(n: number) {
    const newIndex = slideIndex + n;

    if (newIndex > 3) {
      setSlideIndex(1); // Reset to the first slide
    } else if (newIndex < 1) {
      setSlideIndex(3); // Go to the last slide
    } else {
      setSlideIndex(newIndex);
    }
  }

  // Thumbnail image controls
  function currentSlide(n: number) {
    setSlideIndex(n);
  }

  function showSlides(n: number) {
    let i;
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName(
      'common-component-slider__slides'
    );
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName('dot');

    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }

    for (i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement;
      slide.style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      const dot = dots[i] as HTMLElement;
      dot.className = dot.className.replace(' active', '');
    }

    const activeSlide = slides[slideIndex - 1] as HTMLElement;
    activeSlide.style.display = 'block';

    const activeDot = dots[slideIndex - 1] as HTMLElement;
    activeDot.className += ' active';
  }

  return (
    <div className="common-component-slider">
      <div className="common-component-slider__slides fade">
        <div>
          <Card className="common-component-slider__slides-card" sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
            <CardContent>
              <Typography sx={{ fontSize: "20px", opacity: 1, color: 'white' }} gutterBottom>
                Get up to 20% off!
              </Typography>
              <Typography sx={{ mb: 1.5, opacity: 1, fontSize: '55px', fontWeight: 'bold', color: 'white' }}>Everything to welcome your puppy home!</Typography>
              <Typography sx={{ fontSize: 14, opacity: 1, color: 'white' }} variant="body2">
                <div>
                  <span className="dot" style={{backgroundColor: '#FAC74F'}} onClick={() => currentSlide(1)}></span>
                  <span className="dot" onClick={() => currentSlide(2)}></span>
                  <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>
              </Typography>

            </CardContent>
            <CardActions>
            <Button variant="contained">Shop now!</Button>
            </CardActions>
          </Card>
        </div>
        <img src={Slider1} alt="Slide 1" />
      </div>

      <div className="common-component-slider__slides fade">
        <div>
          <Card className="common-component-slider__slides-card" sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
            <CardContent>
              <Typography sx={{ fontSize: "20px", opacity: 1, color: 'white' }} gutterBottom>
              Bird food & accessories
              </Typography>
              <Typography sx={{ mb: 1.5, opacity: 1, fontSize: '55px', fontWeight: 'bold', color: 'white' }}>
                <div>Make Your</div>
                <div>Bird Happy</div>
              </Typography>
              <Typography sx={{ fontSize: 14, opacity: 1, color: 'white' }} variant="body2">
                <div>
                  <span className="dot" onClick={() => currentSlide(1)}></span>
                  <span className="dot" style={{backgroundColor: '#FAC74F'}} onClick={() => currentSlide(2)}></span>
                  <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>
              </Typography>

            </CardContent>
            <CardActions>
            <Button variant="contained">Shop now!</Button>
            </CardActions>
          </Card>
        </div>
        <img src={Slider2} alt="Slide 2" />
      </div>

      <div className="common-component-slider__slides fade">
        <div>
          <Card className="common-component-slider__slides-card" sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
            <CardContent>
              <Typography sx={{ fontSize: "20px", opacity: 1, color: 'white' }} gutterBottom>
              Satisfy Your Bird's Palate
              </Typography>
              <Typography sx={{ mb: 1.5, opacity: 1, fontSize: '55px', fontWeight: 'bold', color: 'white' }}>Best Bird clothing and accessories</Typography>
              <Typography sx={{ fontSize: 14, opacity: 1, color: 'white' }} variant="body2">
                <div>
                  <span className="dot" onClick={() => currentSlide(1)}></span>
                  <span className="dot" onClick={() => currentSlide(2)}></span>
                  <span className="dot" style={{backgroundColor: '#FAC74F'}} onClick={() => currentSlide(3)}></span>
                </div>
              </Typography>

            </CardContent>
            <CardActions>
            <Button variant="contained">Shop now!</Button>
            </CardActions>
          </Card>
        </div>
        <img src={Slider3} alt="Slide 3" />
      </div>

      <a className="prev" onClick={() => plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={() => plusSlides(1)}>
        &#10095;
      </a>
    </div>
  );
};

export default SliderComponent;
