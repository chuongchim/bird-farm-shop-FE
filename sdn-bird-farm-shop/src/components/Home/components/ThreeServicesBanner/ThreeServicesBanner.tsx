import { Grid } from "@mui/material";
import React from "react";
import "./ThreeServicesBanner.css";
export default function ThreeServicesBanner() {
  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          {ServiceItem(
            "Chim cảnh",
            "https://45397-theme003.myshopify.com/cdn/shop/files/banner_4_590x789_crop_center.png?v=1620302128"
          )}
        </Grid>
        <Grid item xs={4}>
          {ServiceItem(
            "Phối giống chim",
            "https://45397-theme003.myshopify.com/cdn/shop/files/banner_5_590x789_crop_center.png?v=1620302151"
          )}
        </Grid>
        <Grid item xs={4}>
          {ServiceItem(
            "Phụ kiện",
            "https://45397-theme003.myshopify.com/cdn/shop/files/Rectangle_13_590x789_crop_center.png?v=1620310033"
          )}
        </Grid>
      </Grid>
    </div>
  );
}
function ServiceItem(name: String, img: any) {
  return (
    <div className="service__item">
      <a href="">
        <img src={img} alt="picture of service" />
      </a>
      <p>
        <a href="#">{name}</a>
      </p>
    </div>
  );
}
