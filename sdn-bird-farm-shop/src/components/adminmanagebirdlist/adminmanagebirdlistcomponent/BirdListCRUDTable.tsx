import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Divider, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import ApiViewService from "../../Views/ApiViewService";
import { BirdInterface } from "../../../models/Bird";
import { basePonitUrl } from "../../../api/ApiConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Bird {
  id: number;
  fullname: string;
  email: string;
  dob: string;
}

const APISERVICE = new ApiViewService();

const BirdListCRUDTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<BirdInterface[]>([]);
  const [row, setRows] = useState<BirdInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormId] = useState<BirdInterface | null>(null);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filtData = (dataFilter: BirdInterface | null) => {
    if (dataFilter) {
      setData([dataFilter]);
    } else {
      setData(row);
    }
  };

  useEffect(() => {
    APISERVICE.getData(basePonitUrl.birds + "/getAllBird")
      .then((data: BirdInterface[]) => {
        setData(data);
        console.log("asddsf: ", data);
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to delete it!",
      });
      if (result.isConfirmed) {
        const numericId = parseInt(id, 10); // Convert the id to a number
        if (!isNaN(numericId)) {
          await deleteUser(numericId);
          Swal.fire(
            "Deleted Bird Success!",
            "Your bird has been deleted!!!",
            "success"
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire(
            "Invalid ID",
            "The provided ID is not a valid number.",
            "error"
          );
        }
      } else {
        Swal.fire(
          "Cancel The Deleted Process",
          "You canceled the deleted process!!!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editData = (bird: BirdInterface) => {
    const dataBird: BirdInterface = {
      _id: bird._id,
      birdName: bird.birdName,
      age: bird.age,
      typeID: bird.typeID,
      images: bird.images,
      gender: bird.gender,
      status: bird.status,
      description: bird.description,
      fertility: bird.fertility,
      feedback: bird.feedback,
      rating: bird.rating,
      price: bird.price,
      typeOfProduct: "BIRD",
      quantity: 1,
      birdColor: bird.birdColor,
      breedingTimes: bird.breedingTimes,
    };
    setFormId(dataBird);
    handleEditOpen();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Bird List
      </Typography>
      <Divider />
      <div style={{ display: "flex" }}>
        <Autocomplete
          onChange={(e, v) => {
            filtData(v as BirdInterface);
          }}
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{ width: 300 }}
          getOptionLabel={(data) => data.birdName || ""}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        <Button onClick={handleOpen} style={{ marginLeft: "60%" }}>
          Add <AddCircleIcon />
        </Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddForm closeCard={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {formid !== null && (
              <EditForm editClose={handleEditClose} birdId={formid} />
            )}
          </Box>
        </Modal>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                _id
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                birdName
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                images
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                age
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                gender
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                fertility
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                typeOfBirdID
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                description
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                price
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                feedback
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                rating
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                status
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {/* <TableCell align='left'>
                                            {}
                                        </TableCell> */}
                    <TableCell key={row._id} align="left">
                      {row._id}
                    </TableCell>
                    <TableCell align="left">{row.birdName}</TableCell>
                    <TableCell align="left">
                      <img
                        src={row.images[0]}
                        style={{ width: "100px", height: "100px" }}
                      ></img>
                    </TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">
                      {row.gender ? "Male" : "Female"}
                    </TableCell>
                    <TableCell align="left">
                      {row.fertility ? "Ability" : "Unability"}
                    </TableCell>
                    <TableCell align="left">{row.typeID.nameType}</TableCell>
                    <TableCell align="left">
                      {row.description.length > 15
                        ? `${row.description.slice(0, 30)}...`
                        : row.description}
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.feedback}</TableCell>
                    <TableCell align="left">{row.rating}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <div style={{ display: "flex" }}>
                        <EditIcon
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => editData(row)}
                        />
                        <DeleteIcon
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => confirmDelete(row._id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default BirdListCRUDTable;
