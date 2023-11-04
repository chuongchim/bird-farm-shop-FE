import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import UploadImgWidget from "../../../utils/UploadImgWidget";
import ApiService from "../../../utils/ApiService";
import { BirdInterface, TypeOfBirdInterface } from "../../../models/Bird";
import { basePonitUrl } from "../../../api/ApiConfig";
import { Label } from "@mui/icons-material";
import { Container } from "@mui/system";
import "../ManageBirdList.css";

const APISERVICE = new ApiService();

// RED,
// BLUE,
// GREEN,
// BLACK,
// WHITE,
// ORANGE,
// SILVER,
// PURPLE,
// BROWN,
// YELLOW
const minAge = 1;
const maxAge = 15;
const minPrice = 500;
const maxPrice = 10000;
interface AddFormProps {
  closeCard: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ closeCard }) => {
  const [formData, setFormData] = useState({
    birdName: "",
    age: 0,
    typeID: "B001",
    images: [] as string[],
    gender: true, // Default gender value (you can change this)
    status: true,
    description: "",
    fertility: true,
    feedback: "",
    rating: 5,
    price: 0, // Default price value (you can change this)
    typeOfProduct: "BIRD",
    quantity: 1,
    healthcareProfessionalID: 2,
    birdColor: "Yellow",
    breedingTimes: 0,
  });

  const [uploadedImageUrls, setUploadedImageUrls] = useState<string>();
  const [imgArray, setImgArray] = useState<string[]>([]);
  const [dataTOB, setDataTOB] = useState<TypeOfBirdInterface[]>([]);
  // const [dataHealthCare, setDataHealthCare] = useState<[]>([]);
  // const [birdsList, setBirdsList] = useState<BirdInterface[]>([]);
  const handleImagesUpload = (imageUrls: string) => {
    imgArray.push(imageUrls);
    setImgArray(imgArray);

    setUploadedImageUrls(imageUrls);
    if (imageUrls) {
      setFormData({
        ...formData,
        images: imgArray,
      });
    }
  };

  const handleRemoveImage = (index: number) => () => {
    const imgArr = imgArray.slice(0, index).concat(imgArray.slice(index + 1));
    setImgArray(imgArr);
  };
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormTypeOfBirdChange = (event: SelectChangeEvent<unknown>) => {
    console.log("TOB", dataTOB);
    const value = event.target.value as string;
    console.log("value type of bird", value);
    setFormData({
      ...formData,
      typeID: value,
    });
    console.log("formData", formData);
  };
  const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    let newValue = value;
    if (value > maxAge) newValue = maxAge;
    if (value < minAge) newValue = minAge;
    setFormData({
      ...formData,
      age: newValue,
    });
  };
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    var value = parseInt(event.target.value, 10);
    let newValue = value;
    if (value > maxPrice) newValue = maxPrice;
    if (value < minPrice) newValue = minPrice;
    setFormData({
      ...formData,
      price: newValue,
    });
  };
  const handleFormHealthCare = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", JSON.stringify(formData));
    APISERVICE.postData(basePonitUrl.birds, formData).then((res: any) => {
      console.log("âsasasas ", res);
      if (res) {
        sessionStorage.setItem("obj", JSON.stringify(formData));
        Swal.fire(
          "Add  Bird Success!",
          "Your Bird has been updated!",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  };

  useEffect(() => {
    APISERVICE.getData("/v1/typeofbird/")
      .then((data: TypeOfBirdInterface[]) => {
        setDataTOB(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // APISERVICE.getData("/v1/bird/").then((data: BirdInterface[]) => {
    //   setBirdsList(data);
    // });
    // APISERVICE.getData("/v1/healthcareproffesional")
    //   .then((data) => {
    //     setDataHealthCare(data);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div
      className="add-from-bird-list"
      style={{ height: "500px", overflowY: "auto" }}
    >
      <div style={{ paddingRight: "30px" }}>
        <Typography variant="h5" align="center">
          Add Bird
        </Typography>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={closeCard}
        >
          <CloseIcon />
        </IconButton>
        <Box height={50} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outline-basic"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              name="birdName"
              value={formData.birdName}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outline-basic"
              label="Age"
              type="number"
              InputProps={{ inputProps: { min: minAge, max: maxAge } }}
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              name="age"
              value={formData.age}
              onChange={handleAge}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Gender</Typography>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Male"
                sx={{ float: "left" }}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Select
              id="typeOfBird-select"
              placeholder="TypeOfBird"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              name="typeID"
              value={formData.typeID}
              onChange={handleFormTypeOfBirdChange}
            >
              {dataTOB.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.nameType}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outline-basic"
              label="Price"
              variant="outlined"
              type="number"
              size="small"
              sx={{ minWidth: "100%" }}
              name="price"
              InputProps={{ inputProps: { min: minPrice, max: maxPrice } }}
              value={formData.price}
              onChange={handlePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              id="description"
              aria-label="Description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleFormChange(e)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImgWidget onImagesUpload={handleImagesUpload} />
            {imgArray.length > 0 && (
              <div>
                <Grid item xs={12}>
                  <Typography>Uploaded Image URLs:</Typography>
                </Grid>
                {imgArray.map((url, index) => (
                  <Box
                    sx={{
                      display: "inline-flex",
                      width: "150px",
                    }}
                  >
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        float: "left",
                      }}
                      src={url}
                      alt={`Uploaded Image ${index}`}
                    />
                    <div>
                      <span
                        style={{
                          width: "30px",
                          fontSize: "20px",
                        }}
                        onClick={handleRemoveImage(index)}
                      >
                        x
                      </span>
                    </div>
                  </Box>
                ))}
              </div>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            <Select
              id="healthcareProfessionalID"
              label="Healthcare Professional"
              variant="outlined"
              size="small"
              sx={{ minWidth: "100%" }}
              name="healthcareProfessionalID"
              value={formData.healthcareProfessionalID}
              onChange={handleFormHealthCare}
            >
              {dataHealthCare.map((item: any) => (
                <MenuItem key={item.userID} value={item.userID}>
                  {item.firstName + " " + item.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid> */}
        </Grid>
        <div
          onClick={closeCard}
          style={{
            textAlign: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
