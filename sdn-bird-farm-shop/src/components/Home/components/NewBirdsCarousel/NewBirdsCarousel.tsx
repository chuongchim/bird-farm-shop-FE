import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import BirdItem from "../../../Bird/BirdList/BirdItem/BirdItem";
import BirdList from "../../../../api/FakeBirdData";
import "./NewBirdsCarousel.css";
function NewBirdsCarousel() {
  const listBirdCarousel = BirdList.slice(0, 15);
  const sliderItems: number =
    listBirdCarousel.length > 3 ? 3 : listBirdCarousel.length;
  const items: Array<any> = [];
  for (let i = 0; i < listBirdCarousel.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <div key={i.toString()}>
          <Grid container spacing={0} className="BannerGrid">
            {listBirdCarousel.slice(i, i + sliderItems).map((item, index) => {
              return (
                <Grid item xs={4} key={index.toString()}>
                  <BirdItem
                    birdName={item.birdName}
                    price={item.price}
                    image={item.image}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    }
  }
  return (
    <div>
      <h4 className="home_title">New Birds</h4>
      <Carousel
        className="carousel"
        animation="slide"
        autoPlay={false}
        cycleNavigation
        duration={300}
      >
        {items}
      </Carousel>
    </div>
  );
}

export default NewBirdsCarousel;
