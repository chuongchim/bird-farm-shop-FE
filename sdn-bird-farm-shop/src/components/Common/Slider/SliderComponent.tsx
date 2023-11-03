import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./SliderComponent.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
interface SettingsT {
  autoPlay: boolean;
  animation: "fade" | "slide";
  indicators: boolean;
  duration: number;
  navButtonsAlwaysVisible: boolean;
  navButtonsAlwaysInvisible: boolean;
  fullHeightHover: boolean;
  cycleNavigation: boolean;
  swipe: boolean;
  [key: string]: any;
}
const SliderComponent = () => {
  const settings: SettingsT = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 400,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true,
  };

  return (
    <div style={{ marginTop: "50px", color: "#494949", height: "100%" }}>
      <Typography variant="h4">Example: eBay&trade; style</Typography>
      <br />
      <Carousel
        className="Example"
        {...settings}
        // next={(now: any, previous:any) => console.log(`Next User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
        // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
        // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}

        // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
        // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
        // indicatorContainerProps={{style: {margin: "20px"}}}
        // NextIcon='next'
      >
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          );
        })}
      </Carousel>
      <br />
      {/* <Settings settings={settings} setSettings={setSettings} /> */}
    </div>
  );
};

type Item = {
  Name: string;
  Caption: string;
  Link: string;
  contentPosition: "left" | "right" | "middle";
  Items: { Name: string; Image: string }[];
};

interface BannerProps {
  item: Item;
  contentPosition: "left" | "right" | "middle";
  length?: number;
}

const Banner = (props: BannerProps) => {
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems: number = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={4} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button
          variant="outlined"
          className="ViewButton"
          href={props.item.Link}
        >
          View Now
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={4} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
};

const items: Item[] = [
  {
    Name: "Bird Shop",
    Caption: "Variety type of birds!",
    Link: "/bird",
    contentPosition: "left",
    Items: [
      {
        Name: "Birds",
        Image: "https://source.unsplash.com/featured/?birds",
      },
      {
        Name: "Copsychus saularis",
        Image: "https://source.unsplash.com/featured/?copsychus saularis",
      },
    ],
  },
  {
    Name: "Matching Birds",
    Caption: "Creative combination of your choice!",
    Link: "/matching-bird",
    contentPosition: "middle",
    Items: [
      {
        Name: "Parrots",
        Image: "https://source.unsplash.com/featured/?parrots",
      },
      {
        Name: "Finches ",
        Image: "https://source.unsplash.com/featured/?finches",
      },
    ],
  },
  {
    Name: "The most special birds",
    Caption: "Guarantee and quality!",
    Link: "/bird",
    contentPosition: "right",
    Items: [
      {
        Name: "Warbler",
        Image: "https://source.unsplash.com/featured/?warbler",
      },
      {
        Name: "Eagles",
        Image: "https://source.unsplash.com/featured/?eagles",
      },
    ],
  },
];

export default SliderComponent;
