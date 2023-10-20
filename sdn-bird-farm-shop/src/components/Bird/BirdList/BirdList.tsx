import React from "react";

import { Grid, Container } from "@mui/material";
import BirdItem from "./BirdItem/BirdItem";
import "./BirdList.css";
import AppPagination from "../../Common/Pagination/AppPagination";
import { BirdInterface } from "../../../models/Bird";
export default function BirdList() {
  const [birdData, setBirdData] = React.useState<BirdInterface[]>([]);
  const changeBirdData = (data: BirdInterface[]) => {
    setBirdData(data);
  };
  return (
    <Container id="bird__list">
      <Grid container id="bird__introduction">
        <Grid item xs={4}>
          <img src="https://45397-theme003.myshopify.com/cdn/shop/collections/collection_1_980x250_crop_center.jpg?v=1620221145"></img>
        </Grid>
        <Grid item xs={5}>
          <h3>Bird Shop</h3>
          <p>
            Have you ever wondered how grateful can be your pet for your care
            and love? Let us be your assistants in making a nice present...
          </p>
        </Grid>
      </Grid>
      <Grid container>
        {birdData.map(({ birdName, price, image }: BirdInterface, i) => (
          <Grid item xs={4}>
            <BirdItem
              birdName={birdName}
              price={price}
              image={image}
            ></BirdItem>
          </Grid>
        ))}
      </Grid>
      <AppPagination setBirdData={changeBirdData} />
    </Container>
  );
}
