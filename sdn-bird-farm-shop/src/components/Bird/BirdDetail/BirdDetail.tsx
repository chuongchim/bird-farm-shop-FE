import { Card, Grid, Box, Button } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { BirdInterface } from "../../../models/Bird";
import BirdList from "../../../api/FakeBirdData";
import "./BirdDetail.css";
export default function BirdDetail() {
  const bird: BirdInterface = BirdList[0];
  return (
    <div>
      <div id="bird-detail">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div id="bird-carousel">
              <Carousel
                className="carousel"
                animation="slide"
                indicators
                cycleNavigation
                duration={300}
              >
                {bird.image.map((item, index) => (
                  <img
                    className="bird-image"
                    key={index}
                    src={item.toString()}
                  ></img>
                ))}
              </Carousel>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Card id="bird-card">
              <div className="bird-info">
                <h1>{bird.birdName}</h1>
                <h2>{bird.price} VNĐ</h2>
                <h4>Details</h4>
                <Grid container>
                  <Grid item xs={6} container>
                    <Grid item xs={4}>
                      <p>ID: </p>
                      <p>Breed: </p>
                      <p>Gender: </p>'
                    </Grid>
                    <Grid item xs={6}>
                      <p>1</p>
                      <p>Chimse</p>
                      <p>Male</p>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} container>
                    <Grid item xs={4}>
                      <p>Age: </p>
                      <p>Status: </p>
                      <p>Fertility: </p>
                    </Grid>
                    <Grid item xs={6}>
                      <p>1</p>
                      <p>Fine</p>
                      <p>OK</p>
                    </Grid>
                  </Grid>
                  {/* <p>{bird.age}</p>
                  <p>{bird.typeOfBird.typeName}</p>
                  <p>{bird.gender ? "Male" : "Female"}</p> */}

                  {/* <Grid item xs={6}>
                  <p>{bird.status.statusName}</p>
                  <p>{bird.fertility}</p>
                </Grid> */}
                </Grid>
                <div>
                  <h4>Description</h4>

                  <p>
                    Believed to be female. Loved pet but international move to a
                    country that won’t allow her means she needs to find a new
                    home. Comes with cage and toys{" "}
                  </p>
                </div>
              </div>
              <div id="addToCart">Add to cart</div>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid container id="addToCart">
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <p>{bird.birdName}</p>
          </Grid>
          <Grid item xs={2}>
            <p>{bird.price}</p>
          </Grid>
          <Grid item xs={4}>
            <Button color="error">Add to cart</Button>
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
}
