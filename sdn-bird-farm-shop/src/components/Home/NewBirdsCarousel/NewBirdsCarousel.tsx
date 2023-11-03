import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
// import BirdItem from "../../../Bird/BirdList/BirdItem/BirdItem";
// import BirdList from "../../../../api/FakeBirdData";

import ApiService from "../../../utils/ApiService";
import Swal from "sweetalert2";

import "./NewBirdsCarousel.css";
import { BirdInterface } from "../../../models/Bird";
import BirdItem from "../../Views/BirdPage/BirdItem/BirdItem";
import { Box } from "@mui/system";
function NewBirdsCarousel() {
  const [birdsList, setBirdsList] = React.useState<BirdInterface[]>([]);
  const [cart, setCart] = React.useState<BirdInterface[]>([]);
  const handleAddToCart = (bird: BirdInterface) => {
    const updatedCart = [...cart, bird];
    setCart(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    Swal.fire(
      "Add to cart  Success!",
      "Your bird has been in Your cart!!!",
      "success"
    );
  };
  const handleDetail = (birdId: string) => {
    window.location.href = "/bird/detail/" + `${birdId}`;
  };
  const APISERVICE = new ApiService();
  React.useEffect(() => {
    APISERVICE.getData("/v1/bird/").then((data: BirdInterface[]) => {
      setBirdsList(data);
    });
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  const listBirdCarousel = birdsList.slice(0, 15);
  const sliderItems: number =
    listBirdCarousel.length > 3 ? 3 : listBirdCarousel.length;
  const items: Array<any> = [];
  for (let i = 0; i < listBirdCarousel.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <div key={i.toString()}>
          <Grid container spacing={2} className="BannerGrid" sx={{ px: 4 }}>
            {listBirdCarousel.slice(i, i + sliderItems).map((item, index) => {
              return (
                <Grid item xs={12} sm={4} key={item._id}>
                  <BirdItem
                    bird={item}
                    handleAddToCart={handleAddToCart}
                    handleDetail={handleDetail}
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
    <div
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
        marginBottom: "30px",
      }}
    >
      <h4 className="home_title">NEW BIRDS</h4>

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
