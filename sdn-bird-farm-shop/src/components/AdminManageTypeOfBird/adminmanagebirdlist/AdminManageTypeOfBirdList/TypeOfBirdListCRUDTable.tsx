import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2'
import Modal from '@mui/material/Modal';
import AddForm from './AddFormTypeOfBird';
import EditForm from './EditForm';
import { basePonitUrl } from '../../../../api/ApiConfig.js';
import { TypeOfBirdInterface } from '../../../../models/Bird.js';
import ApiService from '../../../../utils/ApiService';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};


const APISERVICE = new ApiService;

const TypeOfBirdListCRUDTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState<TypeOfBirdInterface[]>([]);
    const [row, setRows] = useState<TypeOfBirdInterface[]>([]);
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [formid, setFormId] = useState<TypeOfBirdInterface | null>(null);

    const handleOpen = () => setOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filtData = (dataFilter: TypeOfBirdInterface | null) => {
        if (dataFilter) {
            setData([dataFilter]);
        } else {
            setData(row);
        }
    }

    useEffect(() => {

        APISERVICE.getData('typeOfBird/getAllTypeOfBird')
            .then((data: TypeOfBirdInterface[]) => {
                setData(data);
                console.log('asddsf: ', data);
                setRows(data);

            }).catch(error => console.error('Error fetching data:', error));

    }, []);

    const deleteUser = async (id: string, name: string) => {
        try {
            
            APISERVICE.putData('typeOfBird/updateTypeOfBird/' + id, { typeName: name, quantity: 0 })
                .then((data) => {
                    console.log("sdfsdklshgj: ", data.json());
                    return data.json();

                }).catch(error => console.error('Error fetching data:', error));

        } catch (error) {
            throw error;
        }
    };

    const confirmDelete = async (id: string, name: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure to delete?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to delete it!'
            });
            if (result.isConfirmed) {
                if (id) {
                    await deleteUser(id, name);
                    Swal.fire(
                        'Deleted Bird Success!',
                        'Your bird has been deleted!!!',
                        'success'
                    );
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    Swal.fire(
                        'Invalid ID',
                        'The provided ID is not a valid number.',
                        'error'
                    );
                }
            } else {
                Swal.fire(
                    'Cancel The Deleted Process',
                    'You canceled the deleted process!!!',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const editData = (typeOfBird: TypeOfBirdInterface) => {
        const dataTypeOfBird: TypeOfBirdInterface = {
            typeID: typeOfBird.typeID,
            typeName: typeOfBird.typeName,
            quantity: 0,
        }
        setFormId(dataTypeOfBird);
        handleEditOpen();
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ padding: "20px" }}
            >
                Bird List
            </Typography>
            <Divider />
            <div style={{ display: "flex" }}>
                <Autocomplete
                    onChange={(e, v) => { filtData(v as TypeOfBirdInterface) }}
                    disablePortal
                    id="combo-box-demo"
                    options={data}
                    sx={{ width: 300 }}
                    getOptionLabel={(data) => data.typeName || ""}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
                <Button onClick={handleOpen} style={{ marginLeft: "60%" }}>Add <AddCircleIcon /></Button>
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
                            <EditForm
                                editClose={handleEditClose}
                                productId={formid}
                            />
                        )}
                    </Box>
                </Modal>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align='left'
                                style={{ minWidth: "100px" }}
                            >
                                typeOfBirdId
                            </TableCell>
                            <TableCell
                                align='left'
                                style={{ minWidth: "100px" }}
                            >
                                typeName
                            </TableCell>
                            <TableCell
                                align='left'
                                style={{ minWidth: "100px" }}
                            >
                                quantity
                            </TableCell>

                            <TableCell
                                align='left'
                                style={{ minWidth: "100px" }}
                            >
                                status
                            </TableCell>
                            <TableCell
                                align='left'
                                style={{ minWidth: "100px" }}
                            >
                                action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.typeID}>
                                        {/* <TableCell align='left'>
                                            {}
                                        </TableCell> */}
                                        <TableCell key={row.typeID} align='left'>
                                            {row.typeID}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row.typeName}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row.quantity}
                                        </TableCell>

                                        <TableCell align='left'>
                                            {row.quantity !== 0 ? (

                                                <Typography style={{color: '#1B9908'}}>Stock</Typography>
                                            )
                                                : (
                                                    <Typography style={{color: '#E63F32'}}>UnStock</Typography>
                                                )}
                                        </TableCell>
                                        <TableCell align='left'>
                                            <div style={{ display: "flex" }}>
                                                <EditIcon style={{ color: "blue", cursor: "pointer" }} onClick={() => editData(row)} />
                                                <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => confirmDelete(row.typeID, row.typeName)} />
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
}

export default TypeOfBirdListCRUDTable;
