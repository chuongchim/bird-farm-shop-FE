import Grid from "@mui/system/Unstable_Grid/Grid";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import { BirdInterface } from "../../../../models/Bird";
import { Button } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CakeIcon from "@mui/icons-material/Cake";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import "./BirdItem.css";
export default function BirdItem({
  bird,
  handleAddToCart,
  handleDetail,
}: {
  bird: BirdInterface;
  handleAddToCart: (bird: BirdInterface) => void;
  handleDetail: (id: string) => void;
}) {
  return (
    <>
      <Card className="bird-page-component--card-bird-list">

        <CardMedia
          src={
            bird.images
              ? bird.images[0]
              : "https://agridoctor.vn/sites/default/files/giong-chim-chao-mao-2.jpg"
          }
          component="img"
          height="215"
          alt={bird.birdName}
        />

        <CardContent sx={{ pt: 2, pb: 0 }}>
          <Typography
            variant="h6"
            style={{
              display: "block",
              fontSize: "19px",
              lineHeight: "1.2",
            }}
            gutterBottom
          >
            {bird.birdName ? bird.birdName : "Chim"}
          </Typography>
          {bird.status === false && (

            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', textAlign: 'center', height: '30px', backgroundColor: 'black', color: 'white' }}>
              Sold
            </div>
          )}
          <Typography
            variant="h6"
            style={{
              display: "block",
              color: "#e9034f",
              fontSize: "20px",
              padding: "0",
              lineHeight: "1.2",
              fontWeight: "bold",
            }}
            gutterBottom
          >
            {bird.price ? bird.price : "Chim"}$
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ py: 0.5 }}>
            <PetsIcon />
            {"  "}
            {bird.typeID && bird.typeID.nameType
              ? bird.typeID.nameType
              : "Chim bạc má"}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ py: 0.5 }}>
            <CakeIcon />
            {"  "} {bird.age ? bird.age : 1} years old
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ py: 0.5 }}>
            {bird.gender ? <MaleIcon /> : <FemaleIcon />}
            {"  "}
            {bird.gender ? "Male" : "Female"}
          </Typography>
        </CardContent>

        <CardActions style={{ flex: "1 1 auto" }}>
          <Button
            className="addToCartBtn"
            variant="contained"
            size="small"
            sx={{ display: "flex", flex: "1", backgroundColor: "#E9034F" }}
            onClick={() => handleAddToCart(bird)}
            disabled={bird.status ? false : true}
          >
            Add to Cart
          </Button>
          <Button
            className="detailBtn"
            variant="contained"
            size="small"
            sx={{ display: "flex", flex: "1", backgroundColor: "#FAC74F" }}
            onClick={() => handleDetail(bird._id)}
          >
            Detail
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
