import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BirdInterface } from "../../../models/Bird";

// interface EditFormProps {
//     birdId: {
//         id: number;
//         fullname: string;
//         email: string;
//         dob: string;
//     };
//     editClose: () => void;
// }

// const EditForm: React.FC<EditFormProps> = ({ birdId, editClose }) => {
//     const [fullname, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [dob, setAddress] = useState("");

//     useEffect(() => {
//         setName(birdId.fullname);
//         setEmail(birdId.email);
//         setAddress(birdId.dob);
//     }, [birdId]);

//     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setName(e.target.value);
//     }

//     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     }

//     const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAddress(e.target.value);
//     }

//     const handleSubmit = () => {
//         const obj = { fullname, email, dob };
//         fetch(`https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello/${birdId.id}`, {
//             method: 'PUT',
//             headers: {
//                 "Access-Control-Allow-Origin": 'http://localhost:3000/employee',
//                 "Accept": "*/*",
//                 "Content-Type": "application/json",
//                 "X-Requested-With": "XMLHttpRequest",
//                 "Cache-Control": "no-cache",
//             },
//             body: JSON.stringify(obj),
//             mode: 'cors'
//         }).then((res) => {
//             sessionStorage.setItem("obj", JSON.stringify(obj));
//             Swal.fire(
//                 'Edit Bird Success!',
//                 'Your bird have been updated yet!!!',
//                 'success'
//             );
//             setTimeout(() => {
//                 window.location.reload();
//             }, 1000);
//         }).catch((err) => {
//             console.log(err);
//         });
//     };

//     return (
//         <Box>
//             <Typography variant="h5" align="center">
//                 Edit Bird
//             </Typography>
//             <IconButton
//                 style={{ position: "absolute", top: 0, right: 0 }}
//                 onClick={editClose}
//             >
//                 <CloseIcon />
//             </IconButton>
//             <Box height={50} />
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField id="outline-basic" label="Name" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={fullname} onChange={handleNameChange} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField id="outline-basic" label="Age" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={email} onChange={handleEmailChange} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField id="outline-basic" label="Address" variant="outlined" size="small" sx={{ minWidth: "100%" }} value={dob} onChange={handleAddressChange} />
//                 </Grid>
//             </Grid>
//             <div onClick={editClose} style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}>
//                 <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>Submit</Button>
//             </div>
//         </Box>
//     );
// }

// export default EditForm;
interface EditFormProps {
  birdId: BirdInterface;
  editClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ birdId, editClose }) => {
  const [formData, setFormData] = useState({
    _id: birdId._id,
    birdName: birdId.birdName,
    age: birdId.age,
    typeID: birdId.typeID,
    images: birdId.images,
    gender: birdId.gender,
    status: birdId.status,
    description: birdId.description,
    fertility: birdId.fertility,
    feedback: birdId.feedback,
    rating: birdId.rating,
    price: birdId.price,
    typeOfProduct: birdId.typeOfProduct,
    quantity: birdId.quantity,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch(
      `https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello/${birdId._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        sessionStorage.setItem("obj", JSON.stringify(formData));
        Swal.fire(
          "Edit Bird Success!",
          "Your bird has been updated!",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <Box>
      <Typography variant="h5" align="center">
        Edit Bird
      </Typography>
      <IconButton
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={editClose}
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
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="age"
            value={formData.age}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outline-basic"
            label="Gender"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="gender"
            value={formData.gender}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outline-basic"
            label="TypeOfBirdID"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="typeOfBirdID"
            value={formData.typeID}
            onChange={handleFormChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outline-basic"
            label="Price"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="price"
            value={formData.price}
            onChange={handleFormChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outline-basic"
            label="Description"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outline-basic"
            label="Images"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            name="images"
            value={formData.images[0]}
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>
      <div
        onClick={editClose}
        style={{ textAlign: "center", alignItems: "center", marginTop: "3rem" }}
      >
        <Button onClick={handleSubmit} style={{ color: "#C77E23" }}>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default EditForm;
