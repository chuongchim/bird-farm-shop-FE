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
import { TimesOneMobiledata } from "@mui/icons-material";
import BirdItem from "./BirdItem/BirdItem";

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
  const [filtData, setFiltData] = useState<BirdInterface[]>(birdsList);
  const [page, setPage] = useState(1);
  const formDataInitialValue = {
    birdName: "",
    gender: true,
    price: [500, 10000],
    age: [1, 15],
    fertility: true,
    typeOfBird: "",
  };
  const [formData, setFormData] = React.useState(formDataInitialValue);

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
  React.useEffect(() => {
    APISERVICE.getData("/v1/typeofbird/")
      .then((data: TypeOfBirdInterface[]) => {
        setDataTOB(data);
        console.log("data type of bird: ", data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    APISERVICE.getData("/v1/bird/").then((data: BirdInterface[]) => {
      setFiltData(data);
      setBirdsList(data);
    });

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
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
      setFiltData(birdsList);
    } else {
      handleInputChange({ target: { name: "typeOfBird", value: type } });
      const newData = filtData.filter((item) => {
        return item.typeID.nameType == type;
      });
      setFiltData(newData);
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
          key="price"
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
          key="fertility"
          label={formData.fertility ? "Fertility: Yes" : "Fertility: No"}
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
          key="birdType"
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

  const handleClick = () => {
    setFiltData(birdsList);
    setFormData(formDataInitialValue);
    // TODO: Clear the search input
  };
  const filterBirdByRequest = () => {
    const dataBody = {
      left_range_age: formData.age[0],
      right_range_age: formData.age[1],
      gender: formData.gender.toString() == "true" ? true : false,
      fertility: formData.fertility.toString() == "true" ? true : false,
      left_range_price: formData.price[0],
      right_range_price: formData.price[1],
    };
    console.log("birdList", birdsList);
    let fillBirds: BirdInterface[] = birdsList.filter((item) => {
      return (
        item.fertility === dataBody.fertility &&
        item.gender === dataBody.gender &&
        item.age >= dataBody.left_range_age &&
        item.age <= dataBody.right_range_age &&
        item.price >= dataBody.left_range_price &&
        item.price <= dataBody.right_range_price
      );
    });
    setFiltData(fillBirds);

    console.log("data body: ", dataBody);
    console.log("fill bird: ", fillBirds);
  };

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

  return (
    <div className="bird-page-component">
      <HeaderComponent />

      <Container
        className="bird-page-component--container"
        sx={{ marginTop: "120px" }}
      >
        <Grid container spacing={3}>
          <Grid
            container
            item
            xs={12}
            sx={{
              marginLeft: "40px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            id="bird__introduction"
          >
            <Grid item xs={4}>
              <img
                height="200px"
                src="https://images.unsplash.com/photo-1486365227551-f3f90034a57c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              ></img>
            </Grid>
            <Grid item xs={5}>
              <h3>Bird Shop</h3>
              <p>
                Have you ever wondered how grateful can be your pet for your
                care and love? Let us be your assistants in making a nice
                present...
              </p>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className="bird-page-component--filter-section"
          >
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
                    width: "95px",
                    marginTop: "20px",
                    marginBottom: "10px",
                    fontSize: "15px",
                    float: "left",
                    backgroundColor: "#FAC74F",
                  }}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <TuneIcon style={{}}></TuneIcon>
                  <Typography
                    style={{
                      textTransform: "unset",
                      fontSize: "12px",
                    }}
                    variant="h6"
                  >
                    Filter
                  </Typography>
                </Button>
                <Button
                  onClick={handleClick}
                  style={{
                    width: "95px",
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
                <Box onSubmit={handleFilter} sx={{ px: 3 }}>
                  <FormLabel>Price</FormLabel>
                  <Slider
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    valueLabelDisplay="auto"
                    min={500}
                    max={10000}
                    sx={{ color: "#E9034F" }}
                  />
                  <br></br>
                  <FormLabel>Age</FormLabel>
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
                  <FormLabel>Gender</FormLabel>
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
                  <FormLabel>Fertility</FormLabel>
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
                        label={item.nameType}
                        onClick={() => handleBirdTypeFilter(item.nameType)}
                        sx={{
                          backgroundColor:
                            formData.typeOfBird === item.nameType
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
            {/* <div style={{ marginTop: "50px" }}>
              <Card style={{ width: "100%", height: "400px" }}>
                <CardContent></CardContent>
              </Card>
            </div> */}
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
                filtData &&
                filtData.map((bird) => (
                  <Grid item xs={12} sm={6} md={4} key={bird._id}>
                    <BirdItem
                      bird={bird}
                      handleAddToCart={handleAddToCart}
                      handleDetail={handleDetail}
                    />
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
