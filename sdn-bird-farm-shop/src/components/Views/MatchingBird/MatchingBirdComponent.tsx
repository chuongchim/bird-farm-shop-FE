import React, { useEffect, useState } from "react";
import {
  Chip,
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BirdSelectionPopup from "./BirdSelectionPopup";
import { MatchingRecordInterface } from "../../../models/MatchingBird";// Import the matching interfaces
import { BirdInterface } from "../../../models/Bird";
import HeaderComponent from "../../Common/Header/HeaderComponent";
import FooterComponent from "../../Common/Footer/FooterComponent";
import "./MatchingBirdComponent.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";


const MatchingBirdComponent: React.FC = () => {
  // Tuan Kiet them danh sach matching records

  const [matchingRecords, setMatchingRecords] = useState<MatchingRecordInterface[]>([]);
  useEffect(() => {
    const fetchMatchingRecords = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/v1/matchingrecord/customer/653fac34e355b96b800fbd29`
        );
        if (response.ok) {
          const data = await response.json();
          setMatchingRecords(data);
        } else {
          console.error("Failed to fetch matching records");
        }
      } catch (error) {
        console.error("Error fetching matching records:", error);
      }
    };

    fetchMatchingRecords();
  }, []);

  const [openPopup1, setOpenPopup1] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [selectedBird1, setselectedBird1] = useState<BirdInterface>({
    _id: "",
    birdName: "",
    age: 1,
    typeID: {
      typeID: "",
      nameType: "",
      quantity: 0,
    },
    images: [],
    gender: true,
    status: true,
    description: "",
    fertility: true,
    feedback: "",
    rating: 5,
    price: 1000,
    typeOfProduct: "BIRD",
    quantity: 1,
    birdColor: "",
    breedingTimes: 1,
  });
  const [selectedBird2, setSelectedBird2] = useState<BirdInterface>({
    _id: "",
    birdName: "",
    age: 1,
    typeID: {
      typeID: "",
      nameType: "",
      quantity: 0,
    },
    images: [],
    gender: true,
    status: true,
    description: "",
    fertility: true,
    feedback: "",
    rating: 5,
    price: 1000,
    typeOfProduct: "BIRD",
    quantity: 1,
    birdColor: "",
    breedingTimes: 1,
  });
  const [matchingPopupOpen, setMatchingPopupOpen] = useState(false);
  const [recommonBirdList2, setRecommonBirdList2] = useState<BirdInterface[]>();
  const [birdList1, setBirdList1] = useState<BirdInterface[] | null>(null);

  useEffect(() => {
    const fetchBirds1 = async () => {
      try {
        const response = await fetch("http://localhost:5000/v1/bird");
        if (response.ok) {
          const data = await response.json();
          setBirdList1(data); // Assuming the response data is an array of BirdInterface
        } else {
          console.error("Failed to fetch birds");
        }
      } catch (error) {
        console.error("Error fetching birds:", error);
      }
    };

    fetchBirds1(); // Call the fetchBirds function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  const [birdList2, setBirdList2] = React.useState<BirdInterface[] | null>(
    null
  );

  useEffect(() => {
    const fetchBirds2 = async () => {
      try {
        const response = await fetch("http://localhost:5000/v1/bird");
        if (response.ok) {
          const data = await response.json();
          setBirdList2(data); // Assuming the response data is an array of BirdInterface
        } else {
          console.error("Failed to fetch birds");
        }
      } catch (error) {
        console.error("Error fetching birds:", error);
      }
    };

    fetchBirds2(); // Call the fetchBirds function when the component mounts
  }, []);

  const [responseMatchingSuccess, setResponseMatchingSuccess] = useState({
    success: 200,
    message: "The pairing request has been successfully created.\nPlease wait for the administrator to approve",
    data: {
      successRate: "",
      birdType: "",
      birdGender: true,
      birdColor: "",
    },
  });

  const [responseMatchingFaild, setResponseMatchingFaild] = useState({
    error: null,
    message: "",
    data: {
      uccessRate: "",
      birdType: "",
      birdGender: true,
      birdColor: "",
    },
  });

  const handleSetBirdList2 = (bird: BirdInterface) => {
    const data = {
      birdName: "bird02",
      price: 100,
      description: "bird02",
      birdColor: "RED",
      images: ["bird02", "bird02"],
      age: 1,
      gender: false,
      fertility: true,
      breedingTimes: 4,
      typeOfBirdID: "TB001",
    };
    // {
    //     birdName: selectedBird1.birdName,
    //     age: selectedBird1.age,
    //     typeOfBirdID: selectedBird1.typeOfBirdID,
    //     images: selectedBird1.images,
    //     gender: selectedBird1.gender,
    //     description: selectedBird1.description,
    //     fertility: selectedBird1.fertility,
    //     price: selectedBird1.price,
    //     birdColor: "YELLOW",
    //     breedingTimes: 1
    // }

    // APISERVICE.getData("bird/matchingBirdInShop?id=" + `${bird._id}`).then(
    //   (birdList) => {
    //     setBirdList2(birdList);
    //   }
    // );

    // APISERVICE.postData('bird/matchingDifferentOwner', data)
    //     .then((resp) => {
    //         setBirdList2(resp)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
  };

  const handleBirdSelection = (bird: BirdInterface, boxNumber: number) => {
    if (boxNumber === 1) {
      setselectedBird1(bird);

      setOpenPopup1(false);
    } else if (boxNumber === 2) {
      setSelectedBird2(bird);
      setOpenPopup2(false);
    }
  };

  const handleMatchingClick = () => {
    const dataBody1 = {
      _id: selectedBird1._id,
      birdName: selectedBird1.birdName,
      age: selectedBird1.age,
      typeOfBirdID: selectedBird1.typeID,
      images: selectedBird1.images,
      gender: selectedBird1.gender,
      description: selectedBird1.description,
      fertility: selectedBird1.fertility,
      price: selectedBird1.price,
      birdColor: "YELLOW",
      breedingTimes: 0,
    };
    const dataBody2 = {
      _id: selectedBird2._id,
      birdName: selectedBird2.birdName,
      age: selectedBird2.age,
      typeOfBirdID: selectedBird2.typeID,
      images: selectedBird2.images,
      gender: selectedBird2.gender,
      description: selectedBird2.description,
      fertility: selectedBird2.fertility,
      price: selectedBird2.price,
      birdColor: "YELLOW",
      breedingTimes: 0,
    };

    const data = {
      bird1ID: dataBody1._id,
      bird2ID: dataBody2._id,
      customerID: '653fac34e355b96b800fbd29',
      customerMessage: 'Ghép cho ra con đại bàng được hem',
      phase: 'pending',
      pending: 'pending Ghép cho ra con đại bàng nhaaaa'

    };

    console.log(data);

    fetch("http://localhost:5000/v1/matchingrecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((resp) => {
        if (resp.data !== null) {
          console.log(resp);
          setResponseMatchingSuccess(resp);
        } else {
          setResponseMatchingFaild(resp);
        }
      })
      .catch((error) => {
        console.error("Error during matching:", error);
      });

    setMatchingPopupOpen(true);
  };

  // useEffect(() => {
  //   APISERVICE.getData("bird/getAllBird").then((data) => {
  //     setBirdList1(data);
  //   });
  // }, []);

  return (
    <div>
      <HeaderComponent></HeaderComponent>

      {/* <div className='matching-bird-component--detail-function'>

            </div> */}
      <div className="matching-bird-component--container">
        <div className="circle-and-card">
          {selectedBird1 && selectedBird1.images ? (
            <>
              <div className="circular-box" onClick={() => setOpenPopup1(true)}>
                <img src={selectedBird1.images[0]} className="circle-image" />
              </div>
            </>
          ) : (
            !selectedBird1 && (
              <>
                <Typography
                  sx={{
                    textAlign: "center",
                    alignItems: "center",
                    marginBottom: "-30px",
                  }}
                >
                  Select Bird 1
                </Typography>
                <div
                  className="circular-box"
                  onClick={() => setOpenPopup1(true)}
                >
                  <IconButton>
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </div>
              </>
            )
          )}
        </div>

        <div className="heart-icon pulse">
          <FavoriteIcon style={{ color: "#E9034F", fontSize: "100px" }} />
        </div>

        <div className="circle-and-card">
          {selectedBird2 && selectedBird2.images ? (
            <>
              <div className="circular-box" onClick={() => setOpenPopup2(true)}>
                <img src={selectedBird2.images[0]} className="circle-image" />
              </div>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  textAlign: "center",
                  alignItems: "center",
                  marginBottom: "-30px",
                }}
              >
                Select Bird 2
              </Typography>
              <div className="circular-box" onClick={() => setOpenPopup2(true)}>
                <IconButton>
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className="matching-bird-component--detail"
        style={{
          display: "flex",
          width: "60%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="matching-bird-component--cards__detail">
          {selectedBird1 ? (
            <Card className="bird-card">
              <div>
                <CardHeader title={selectedBird1.birdName}></CardHeader>
                <CardContent>
                  <Typography variant="body2">
                    Age: {selectedBird1.age}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {selectedBird1.gender ? "Male" : "Female"}
                  </Typography>
                  <Typography variant="body2">
                    Type: {selectedBird1.typeID.nameType}
                  </Typography>
                  <Typography variant="body2">
                    Price: {selectedBird1.price}
                  </Typography>
                  <Typography variant="body2">
                    Fertility: {selectedBird1.fertility}
                  </Typography>
                  <Typography variant="body2">
                    Description: {selectedBird1.description}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ) : null}
        </div>
        <Button
          variant="contained"
          className="matching-button"
          onClick={() => handleMatchingClick()}
          style={{ margin: "0 auto", display: "flex" }}
        >
          Matching
        </Button>
        <div className="matching-bird-component--cards__detail">
          {selectedBird2 ? (
            <Card className="bird-card">
              <div>
                <CardHeader title={selectedBird2.birdName}></CardHeader>
                <CardContent>
                  <Typography variant="body2">
                    Age: {selectedBird2.age}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {selectedBird2.gender ? "Male" : "Female"}
                  </Typography>
                  <Typography variant="body2">
                    Type: {selectedBird2.typeID.nameType}
                  </Typography>
                  <Typography variant="body2">
                    Price: {selectedBird2.price}
                  </Typography>
                  <Typography variant="body2">
                    Fertility: {selectedBird2.fertility}
                  </Typography>
                  <Typography variant="body2">
                    Description: {selectedBird2.description}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ) : null}
        </div>
      </div>

      {/* Use the BirdSelectionPopup component */}
      <BirdSelectionPopup
        open={openPopup1}
        onClose={() => setOpenPopup1(false)}
        birds={birdList1}
        onBirdSelect={(bird1) => {
          handleBirdSelection(bird1, 1);
          handleSetBirdList2(bird1);
        }}
      />

      <BirdSelectionPopup
        open={openPopup2}
        onClose={() => setOpenPopup2(false)}
        birds={birdList2}
        onBirdSelect={(bird) => handleBirdSelection(bird, 2)}
      />

      <Dialog
        open={matchingPopupOpen}
        onClose={() => setMatchingPopupOpen(false)}
      >
        <DialogTitle>Matching Capabilities</DialogTitle>
        <DialogContent>
          {responseMatchingSuccess.success === 200 && (
            <div>
              <Typography>
                Message: {responseMatchingSuccess.message}
              </Typography>
              <Typography>
                {responseMatchingSuccess.data.successRate}
              </Typography>
              <Typography>{responseMatchingSuccess.data.birdType}</Typography>
              <Typography>{responseMatchingSuccess.data.birdColor}</Typography>
              <Typography>
                {responseMatchingSuccess.data.successRate}
              </Typography>
            </div>
          )}

          {responseMatchingFaild.error === -1 && (
            <div>
              <Typography>Message: {responseMatchingFaild.message}</Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Box display="flex" justifyContent="center" bgcolor="transparent">
      <Grid container spacing={2}>
        {matchingRecords.map((record) => (
          <Grid item xs={12} md={6} key={record._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2">Customer Message: {record.customerMessage}</Typography>
                <Typography variant="body2">Pending: {record.pending}</Typography>
                <Typography variant="body2">Denied: {record.denied}</Typography>
                <Typography variant="body2">Matching: {record.matching}</Typography>
                <Typography variant="body2">Success: {record.success}</Typography>
                <Typography variant="body2">Raising: {record.raising}</Typography>

                <Box mt={2}>
                  {/* Display status chips */}
                  <Chip label={record.phase} className="status-chip" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    
      <FooterComponent></FooterComponent>
    </div>

    
  );
};

export default MatchingBirdComponent;