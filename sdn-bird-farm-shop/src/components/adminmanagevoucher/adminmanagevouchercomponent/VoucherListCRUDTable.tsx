import React, { useState, useEffect, ChangeEvent } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddForm from './AddForm';
import EditForm from './EditForm';

interface Voucher {
    id: string;
    fullname: string;
    email: string;
    dob: string;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const VoucherListCRUDTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [row, setRows] = useState<Voucher[]>([]);
    const [data, setData] = useState<Voucher[]>([]);
    const [open, setOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [formid, setFormId] = useState<Voucher | null>(null);

    const handleOpen = () => setOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filtData = (dataFilter: Voucher | null) => {
        if (dataFilter) {
            setData([dataFilter]);
            console.log(data);
        } else {
            setData(row);
        }
    };

    useEffect(() => {
        const apiUrl = 'https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setRows(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const deleteUser = async (id: string) => {
        try {
            const response = await fetch(`https://641140292e340b45b13fd8d5.mockapi.io/api/v1/hello/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error deleting user');
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
                title: 'Are you sure to delete?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to delete it!',
            });
            console.log(result);
            if (result.isConfirmed) {
                await deleteUser(id);
                Swal.fire('Deleted Voucher Success!', 'Your voucher has been deleted!!!', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                return await Swal.fire(
                    'Cancel The Deleted Process',
                    'You cancelled the deleted process!!!',
                    'error',
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const editData = (id: string, fullname: string, email: string, dob: string) => {
        const dataEmployee: Voucher = {
            id: id,
            fullname: fullname,
            email: email,
            dob: dob,
        };
        setFormId(dataEmployee);
        handleEditOpen();
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                Voucher List
            </Typography>
            <Divider />
            <div style={{ display: 'flex' }}>
                <Autocomplete
                    onChange={(e, v) => {
                        filtData(v);
                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={data}
                    sx={{ width: 300 }}
                    getOptionLabel={data => data.fullname || ''}
                    renderInput={params => <TextField {...params} label="Search" />}
                />
                <Button onClick={handleOpen} style={{ marginLeft: '60%' }}>
                    Add <AddCircleIcon />
                </Button>
                <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <AddForm closeCard={handleClose} />
                    </Box>
                </Modal>
                <Modal open={editopen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        {formid !== null && (
                            <EditForm
                                editClose={handleEditClose}
                                fid={formid}
                            />
                        )}
                    </Box>
                </Modal>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ minWidth: '100px' }}>
                                Name
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: '100px' }}>
                                Email
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: '100px' }}>
                                DOB
                            </TableCell>
                            <TableCell align="left" style={{ minWidth: '100px' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell key={row.id} align="left">
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.dob}</TableCell>
                                    <TableCell align="left">
                                        <div style={{ display: 'flex' }}>
                                            <EditIcon
                                                style={{ color: 'blue', cursor: 'pointer' }}
                                                onClick={() => editData(row.id, row.fullname, row.email, row.dob)}
                                            />
                                            <DeleteIcon
                                                style={{ color: 'red', cursor: 'pointer' }}
                                                onClick={() => confirmDelete(row.id)}
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

export default VoucherListCRUDTable;
