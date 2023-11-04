import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Divider,
} from "@mui/material";
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
import Chip from "@mui/material/Chip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { MatchingRecordInterface } from "../../../models/MatchingBird";


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

const MatchingRecordsCRUDTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [row, setRows] = useState<MatchingRecordInterface[]>([]);
  const [data, setData] = useState<MatchingRecordInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormId] = useState<MatchingRecordInterface | null>(null);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [previousStatus, setPreviousStatus] = useState("");
  const [objectID, setObjectID] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleUpdate = (id: string, previousStatus: string) => {
    setPreviousStatus(previousStatus);
    setObjectID(id);
    setUpdateOpen(true);
  };

  const phaseColors = {
    pending: "orange",
    matching: "green",
    denied: "red",
    success: "blue",
    raising: "purple",
    canceled: "gray",
  };

  const handleUpdateSubmit = (id: string) => {
    // Determine the new phase based on the previous phase
    let newPhase = "";
    switch (previousStatus) {
      case "matching":
        newPhase = "success";
        break;
      case "success":
        newPhase = "raising";
        break;
      default:
        // Handle other cases if necessary
        break;
    }

    // Send API request to update phase with the provided message (updateMessage)
    fetch(`http://localhost:5000/v1/matchingrecord/phase/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPhase: newPhase,
        message: updateMessage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log("Matching record updated:", data);
        // You can handle success feedback to the user here if needed
        setUpdateOpen(false); // Close the popup after successful update
      })
      .catch((error) => {
        console.error("Error updating matching record phase:", error);
        // Handle error feedback to the user here if needed
      });
  };

  const handleApprove = (id: string, pendingMessage: string) => {
    // Open modal for inputting message
    Swal.fire({
      title: "Enter Message",
      input: "textarea",
      inputPlaceholder: "Enter your message...",
      //   inputValue: pendingMessage, // Set the default value to the pending message
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Message cannot be empty!";
        } else {
          // Send API request to update phase with the provided message
          fetch(`http://localhost:5000/v1/matchingrecord/phase/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPhase: "matching",
              message: value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response if needed
              console.log("Matching record approved:", data);
              // You can handle success feedback to the user here if needed
            })
            .catch((error) => {
              console.error("Error updating matching record phase:", error);
              // Handle error feedback to the user here if needed
            });
        }
      },
    });
  };

  const handleReject = (id: string) => {
    // Open modal for inputting message
    Swal.fire({
      title: "Enter Message",
      input: "textarea",
      inputPlaceholder: "Enter your message...",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Message cannot be empty!";
        } else {
          // Send API request to deny matching request with the provided message
          fetch(`http://localhost:5000/v1/matchingrecord/deny/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle the response if needed
              console.log("Matching record denied:", data);
              // You can handle success feedback to the user here if needed
            })
            .catch((error) => {
              console.error("Error denying matching record:", error);
              // Handle error feedback to the user here if needed
            });
        }
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filtData = (dataFilter: MatchingRecordInterface | null) => {
    if (dataFilter) {
      setData([dataFilter]);
      console.log(data);
    } else {
      setData(row);
    }
  };

  useEffect(() => {
    const apiUrl = "http://localhost:5000/v1/matchingrecord";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]);

  const deleteUser = async (id: string) => {
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
      const deletedData = await response.json();
      return deletedData;
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
      console.log(result);
      if (result.isConfirmed) {
        await deleteUser(id);
        Swal.fire(
          "Deleted Matching Record Success!",
          "Your matching record has been deleted!!!",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        return await Swal.fire(
          "Cancel The Deleted Process",
          "You cancelled the deleted process!!!",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editData = (
    _id: string,
    bird1ID: string,
    bird2ID: string,
    customerID: string,
    phase: string,
    customerMessage: string,
    pending: string,
    denied: string,
    matching: string,
    success: string,
    raising: string
  ) => {
    const dataEmployee: MatchingRecordInterface = {
      _id: _id,
      bird1ID: bird1ID,
      bird2ID: bird2ID,
      customerID: customerID,
      customerMessage: customerMessage,
      phase: phase,
      pending: pending,
      denied: denied,
      matching: matching,
      success: success,
      raising: raising,
    };
    setFormId(dataEmployee);
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
        Matching Record
      </Typography>
      <Divider />
      <div style={{ display: "flex" }}>
        <Autocomplete
          onChange={(e, v) => {
            filtData(v);
          }}
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{ width: 300 }}
          getOptionLabel={(data) => data._id || ""}
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
          open={updateOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Chip
              label={`Previous Phase: ${previousStatus}`}
              color="primary"
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Enter Message"
              multiline
              rows={4}
              variant="outlined"
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleUpdateSubmit(objectID);
                setUpdateMessage("");
              }}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setUpdateMessage(""); // Clear the TextField value
                setUpdateOpen(false); // Close the modal
              }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>

        {/* <Modal
          open={editopen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {formid !== null && (
              <EditForm editClose={handleEditClose} fid={formid} />
            )}
          </Box>
        </Modal> */}
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Customer ID
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                First Bird
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Second Bird
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Present Phase
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell key={row._id} align="left">
                      {row.customerID}
                    </TableCell>
                    <TableCell align="left">{row.bird1ID}</TableCell>
                    <TableCell align="left">{row.bird1ID}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.phase}
                        color={
                          row.phase === "pending"
                            ? "default"
                            : row.phase === "matching"
                            ? "primary"
                            : row.phase === "denied"
                            ? "error"
                            : row.phase === "success"
                            ? "success"
                            : row.phase === "raising"
                            ? "info"
                            : "default"
                        }
                      />
                    </TableCell>

                    <TableCell align="left">
                      {row.phase === "pending" && (
                        <div style={{ display: "flex" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleApprove(row._id, row.pending)}
                            style={{ marginRight: 10 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleReject(row._id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {row.phase !== "pending" &&
                        row.phase !== "raising" &&
                        row.phase !== "denied" &&
                        row.phase !== "canceled" && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(row._id, row.phase)}
                          >
                            Update
                          </Button>
                        )}
                      {(row.phase === "raising" ||
                        row.phase === "denied" ||
                        row.phase === "canceled") && (
                        <IconButton disabled>
                          <HighlightOffIcon />
                        </IconButton>
                      )}
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

export default MatchingRecordsCRUDTable;
