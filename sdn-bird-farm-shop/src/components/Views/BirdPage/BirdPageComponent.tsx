import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import image from "../../../assets/img/Các loài chim/Chim Bạc Má/Chim Bạc Má (1).jpg";
import CardMedia from "@mui/material/CardMedia";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Chip,
  FormControl,
  InputAdornment,
} from "@mui/material";

import HeaderComponent from "../../Common/Header/HeaderComponent";
import FooterComponent from "../../Common/Footer/FooterComponent";
import { BirdInterface, TypeOfBirdInterface } from "../../../models/Bird";
import { emphasize, styled } from "@mui/material/styles";

import "./BirdPageComponent.css";
import { useParams } from "react-router-dom";
import ApiService from "../../../utils/ApiService";
import { apiBaseUrl, basePonitUrl } from "../../../api/ApiConfig";
import Swal from "sweetalert2";
import CircularIndeterminate from "../../Common/Loading/Loading";

const APISERVICE = new ApiService();
const URL = apiBaseUrl;

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    fontSize: "15px",
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const BirdPageComponent: React.FC = () => {
  const [searchType, setSearchType] = useState("");
  const birds: BirdInterface[] = [];
  const [birdsList, setBirdsList] = React.useState<BirdInterface[]>([]);
  const [typeOfBird, settypeOfBird] = React.useState<TypeOfBirdInterface[]>([]);
  const [dataTOB, setDataTOB] = useState<TypeOfBirdInterface[]>([]);

  const [page, setPage] = useState(1);
  const [formData, setFormData] = React.useState({
    birdName: "",
    gender: true,
    price: [200000, 10000000],
    age: [1, 15],
    fertility: true,
    typeOfBird: "",
  });

  const [cart, setCart] = React.useState<BirdInterface[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "gender") {
      setFormData({
        ...formData,
        gender: value,
      });
    } else if (name === "typeOfBird") {
      setFormData({
        ...formData,
        typeOfBird: value,
      });
    } else if (name === "fertility") {
      setFormData({
        ...formData,
        fertility: value,
      });
    } else if (name === "price") {
      setFormData({
        ...formData,
        price: value,
      });
    } else if (name === "age") {
      setFormData({
        ...formData,
        age: value,
      });
    }
  };

  const handleBirdTypeFilter = (type: any) => {
    if (formData.typeOfBird === type) {
      handleInputChange({ target: { name: "typeOfBird", value: "" } });
      setFormData({ ...formData, typeOfBird: type });
    } else {
      handleInputChange({ target: { name: "typeOfBird", value: type } });
    }
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];

    if (breadcrumbs.length === 0) {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          label="All"
        ></StyledBreadcrumb>
      );
    }
    // else if (breadcrumbs.length === 1){
    //     breadcrumbs.push(
    //         <></>
    //     )
    // }
    // else if (breadcrumbs.length >= 1) {

    // Push breadcrumb items based on selected filters
    if (formData.gender !== null) {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          key="gender"
          component="a"
          href="#"
          label={`${formData.gender ? "Male" : "Female"}`}
        />
        // <StyledBreadcrumb color="inherit" key="gender">
        //     {formData.gender ? 'Male' : 'Female'}
        // </StyledBreadcrumb>
      );
    }

    if (formData.price[0] !== 200000 || formData.price[1] !== 10000000) {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          component="a"
          href="#"
          label={`$${formData.price[0]} - $${formData.price[1]}`}
        />
        // <Link color="inherit" key="price">
        //     {`price: $${formData.price[0]} - $${formData.price[1]}`}
        // </Link>
      );
    }

    if (formData.age[0] !== 1 || formData.age[1] !== 15) {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          key="age"
          component="a"
          href="#"
          label={`${formData.age[0]} - ${formData.age[1]} years`}
        />
        // <Link color="inherit" key="age">
        //     {`age: ${formData.age[0]} - ${formData.age[1]} years`}
        // </Link>
      );
    }

    if (formData.fertility !== null) {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          component="a"
          href="#"
          label={`${formData.fertility}` ? "fertility: Yes" : "fertility: No"}
        />

        // <Link color="inherit" key="fertility">
        //     {formData.fertility ? 'fertility: Yes' : 'fertility: No'}
        // </Link>
      );
    }

    if (formData.typeOfBird !== "") {
      breadcrumbs.push(
        <StyledBreadcrumb
          style={{ backgroundColor: "#FAC74F" }}
          component="a"
          href="#"
          label={`${formData.typeOfBird}`}
        />

        // <Link color="inherit" key="birdType">
        //     {`Type of Bird: ${formData.typeOfBird}`}
        // </Link>
      );
      // }
    }

    return breadcrumbs;
  };

  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleClick = (): void => {
    // TODO: Clear the search input
    console.log("clicked the clear icon...");
  };

  React.useEffect(() => {
    APISERVICE.getData("/v1/typeofbird/")
      .then((data: TypeOfBirdInterface[]) => {
        setDataTOB(data);
        console.log("type of bird data: ", data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    APISERVICE.getData("/v1/bird/").then((data: BirdInterface[]) => {
      setBirdsList(data);
      console.log("asddsf: ", data);
    });

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleFilter = () => {
    console.log(JSON.stringify(formData));
  };

  const itemsPerPage = 12; // Change this value as needed
  const filteredBirds = birds.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handlePageChange = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };

  const filterBirdByRequest = () => {
    const dataBody = {
      left_range_age: formData.age[0].toString(),
      right_range_age: formData.age[1].toString(),
      gender: formData.gender ? "male" : "female",
      fertility: formData.fertility ? "true" : "false",
      typeOfBirdName: formData.typeOfBird,
      left_range_price: formData.price[0].toString(),
      right_range_price: formData.price[1].toString(),
      color: "",
    };

    console.log("object: ", dataBody);
    APISERVICE.postData("bird/filterBirdByRequest", dataBody).then((data) => {
      setIsLoading(true);
      setTimeout(() => {
        if (data) {
          setIsLoading(false);
          setBirdsList(data);
        }
      }, 2000);
    });
  };

  return (
    <div className="bird-page-component">
      <HeaderComponent />

      <Container
        className="bird-page-component--container"
        sx={{ marginTop: "250px" }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className="bird-page-component--filter-section"
          >
            <Typography variant="h4" fontWeight="bold">
              Bird shop
            </Typography>
            <Card>
              <CardContent>
                <FormControl>
                  <TextField
                    size="small"
                    variant="outlined"
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ display: showClearIcon }}
                          onClick={handleClick}
                        >
                          <ClearIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Button
                  onClick={filterBirdByRequest}
                  style={{
                    width: "100px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontSize: "15px",
                    float: "left",
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <TuneIcon style={{}}></TuneIcon>
                  <Typography
                    style={{ textTransform: "unset", fontSize: "12px" }}
                    variant="h6"
                  >
                    Filter
                  </Typography>
                </Button>
                <Button
                  style={{
                    width: "100px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    marginLeft: "20px",
                    fontSize: "11px",
                    backgroundColor: "#EBEBEB",
                    color: "#000",
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <ClearIcon style={{}}></ClearIcon>
                  <Typography
                    style={{ textTransform: "unset", fontSize: "12px" }}
                    variant="h6"
                  >
                    Clear
                  </Typography>
                </Button>
                <Box onSubmit={handleFilter}>
                  <FormLabel>price</FormLabel>
                  <Slider
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    valueLabelDisplay="auto"
                    min={200000}
                    max={10000000}
                    sx={{ color: "#E9034F" }}
                  />
                  <br></br>
                  <FormLabel>age</FormLabel>
                  <Slider
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={15}
                    sx={{ color: "#E9034F" }}
                  />
                  <br></br>
                  <FormLabel>gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio className="custom-radio" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio className="custom-radio" />}
                      label="Male"
                    />
                  </RadioGroup>
                  <br />
                  <FormLabel>fertility</FormLabel>
                  <RadioGroup
                    row
                    name="fertility"
                    value={formData.fertility}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio className="custom-radio" />}
                      label="No"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio className="custom-radio" />}
                      label="Yes"
                    />
                  </RadioGroup>

                  <br></br>
                  <FormLabel>Type of Bird</FormLabel>
                  <div className="chip-container">
                    {dataTOB.map((item: TypeOfBirdInterface) => (
                      <Chip
                        label={item.typeName}
                        onClick={() => handleBirdTypeFilter(item.typeName)}
                        sx={{
                          backgroundColor:
                            formData.typeOfBird === item.typeName
                              ? "#FAC74F"
                              : "default",
                        }}
                        className="chip"
                      />
                    ))}
                  </div>
                </Box>
              </CardContent>
            </Card>
            <div style={{ marginTop: "50px" }}>
              <Card style={{ width: "100%", height: "400px" }}>
                <CardContent></CardContent>
              </Card>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <div className="bird-page-component--show-chip-filter">
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {generateBreadcrumbs()}
              </Breadcrumbs>
            </div>
            <Grid container spacing={3}>
              {isLoading ? (
                <div style={{ width: "100%" }}>
                  <CircularIndeterminate></CircularIndeterminate>
                </div>
              ) : (
                birdsList.map((bird) => (
                  <Grid item xs={12} sm={6} md={4} key={bird._id}>
                    <Card className="bird-page-component--card-bird-list">
                      <CardMedia
                        src={
                          bird.images
                            ? bird.images[0]
                            : "https://agridoctor.vn/sites/default/files/giong-chim-chao-mao-2.jpg"
                        }
                        component="img"
                        height="194"
                        alt={bird.birdName}
                      />

                      <CardContent style={{ height: "50px" }}>
                        <Typography
                          variant="h6"
                          style={{
                            display: "inline",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                          gutterBottom
                        >
                          {bird.birdName ? bird.birdName : "Chim"}
                        </Typography>
                        <div
                          style={{
                            display: "inline-block",
                            width: "fit-content",
                            textAlign: "center",
                            backgroundColor: "black",
                            marginLeft: "10px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            style={{
                              display: "inline",
                              fontSize: "15px",
                              color: "white",
                              padding: "5px",
                            }}
                          >
                            ${bird.price ? bird.price : 100000}
                          </Typography>
                        </div>
                      </CardContent>

                      <CardContent
                        style={{ flex: "1 1 auto", marginTop: "10px" }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Type:{" "}
                          {dataTOB.map((item: TypeOfBirdInterface) => {
                            if (item.typeID === bird.typeOfBirdID) {
                              return item.typeName;
                            }
                          })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          age: {bird.age}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          gender: {bird.gender ? "Male" : "Female"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Description:{" "}
                          {bird.description && bird.description.length > 15
                            ? `${bird.description.slice(0, 15)}...`
                            : bird.description}
                        </Typography>
                      </CardContent>

                      <CardActions style={{ flex: "1 1 auto" }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleAddToCart(bird)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          onClick={() => handleDetail(bird._id)}
                        >
                          Detail
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
            <Stack
              style={{
                position: "relative",
                right: "0",
                top: "20",
                marginTop: "30px",
                float: "right",
              }}
              spacing={2}
            >
              <Pagination
                count={Math.ceil(birdsList.length / itemsPerPage)}
                shape="rounded"
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default BirdPageComponent;
