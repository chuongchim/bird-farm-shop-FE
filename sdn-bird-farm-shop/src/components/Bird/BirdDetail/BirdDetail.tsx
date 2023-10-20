import { Card, Grid, Box } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { BirdInterface } from "../../../models/Bird";
import BirdList from "../../../api/FakeBirdData";
import "./BirdDetail.css";
export default function BirdDetail() {
  const bird: BirdInterface = BirdList[0];
  return (
    <div id="bird-detail">
      <Grid container>
        <Grid item xs={8}>
          <Card id="bird-card">
            <h1>{bird.birdName}</h1>
            <div id="bird-carousel">
              <Carousel
                className="carousel"
                animation="slide"
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

            <div className="bird-info">
              <h2>Details</h2>
              <Grid container>
                <Grid item xs={6}>
                  <p>{bird.age}</p>
                  <p>{bird.typeOfBird.typeName}</p>
                  <p>{bird.gender ? "Male" : "Female"}</p>
                </Grid>
                <Grid item xs={6}>
                  <p>{bird.status.statusName}</p>
                  <p>{bird.fertility}</p>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
