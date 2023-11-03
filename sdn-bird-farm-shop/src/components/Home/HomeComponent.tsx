import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import HeaderComponent from "../Common/Header/HeaderComponent";
import FooterComponent from "../Common/Footer/FooterComponent";
import SliderComponent from "../Common/Slider/SliderComponent";
import BackGound1 from "../../assets/img/backgound-1.jpg";
import BackGound2 from "../../assets/img/backgound-2.jpg";
import BackGound3 from "../../assets/img/backgound-3.jpg";
import OrderForm from "../Order/OrderForm/OrderForm";
import UploadImgWidget from "../../utils/UploadImgWidget";
import NewBirdsCarousel from "./NewBirdsCarousel/NewBirdsCarousel";

// import StoreImageTextFirebase from '../../utils/StoreImgTextFirebase';

const itemData = [
  {
    img: BackGound1,
    title: "Bed",
    width: "285px",
    height: "500px",
  },
  {
    img: BackGound3,
    title: "Books",
    width: "200px",
    height: "250px",
  },
  {
    img: BackGound2,
    title: "Sink",
    width: "100px",
    height: "200px",
  },
  {
    img: BackGound1,
    title: "Kitchen",
    width: "200px",
    height: "200px",
  },
  {
    img: BackGound3,
    title: "Blinds",
    width: "200px",
    height: "200px",
  },
  {
    img: BackGound2,
    title: "Chairs",
    width: "210px",
    height: "330px",
  },
];

export default function HomeComponent() {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <SliderComponent></SliderComponent>
      <NewBirdsCarousel></NewBirdsCarousel>

      <Box
        sx={{
          width: "60%",
          height: 450,
          overflowY: "hidden",
          margin: "0 auto",
        }}
      >
        <div
          className="home-sub-slider"
          style={{
            overflowY: "scroll",
            maxHeight: "100%",
            paddingRight: "16px",
          }}
        >
          <style>
            {`
                div::-webkit-scrollbar {
                    width: 0.4em;
                }
                div::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0); /* Change to your background color */
                }
            `}
          </style>
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem>
                <img
                  srcSet={`${item.img}`}
                  src={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: item.width,
                    height: item.height,
                    margin: "10px",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </Box>
      <FooterComponent></FooterComponent>
      {/* <UploadImgWidget></UploadImgWidget> */}
      {/* <StoreImageTextFirebase></StoreImageTextFirebase> */}
    </div>
  );
}
