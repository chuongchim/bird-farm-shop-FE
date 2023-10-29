import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  TextField, TextareaAutosize, Button, Container, Grid, Card, CardContent, Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CardMedia,
} from '@mui/material';
import './OrderFormStyles.css'; // Import the CSS file
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ApiService from '../../../utils/ApiService';
import { crossUrl } from '../../../api/ApiConfig';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';




interface OrderFormProps {
  listProduct: any[];
  voucherList: any[];
}

interface SelectedInformation {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  description: string;
}
import LocationOnIcon from '@mui/icons-material/LocationOn';

const APISERVICE = new ApiService;
// Update the API URL to use CORS Anywhere
const apiUrl = 'https://cors-anywhere.herokuapp.com/https://vapi.vnappmob.com/api/';

// Define the proxy URL using cors-anywhere
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';



const OrderFormComponent: React.FC<OrderFormProps> = ({ listProduct, voucherList }) => {

  const listProducts = sessionStorage.getItem("listProduct");
  const parsedListProducts = listProducts ? JSON.parse(listProducts) : [];
  const listVouchers = sessionStorage.getItem("listVoucher");
  const parsedListVouchers = listVouchers ? JSON.parse(listVouchers) : [];
  const listInfo = localStorage.getItem("informationList");
  const parsedListInfo = listInfo ? JSON.parse(listInfo) : []

  const [formData, setFormData] = useState({
    customerID: "5",
    customerPhone: '',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    description: '',
    listProduct: parsedListProducts as string[],
    voucherList: parsedListVouchers as string[],
  });
  const [provinces, setProvinces] = useState<Object[]>();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState<Object[]>();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState<Object[]>();
  const [selectedWard, setSelectedWard] = useState('');
  const [errors, setErrors] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [address, setAddress] = useState('');
  const [orderResponse, setOrderResponse] = useState<{}>({})
  const [returnUrl, setReturnUrl] = useState('');
  const [informationList, setInformationList] = useState<Object[]>(parsedListInfo);
  const [selectedInformation, setSelectedInformation] = useState<SelectedInformation>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);




  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleOpenDialogEdit = () => {
    setEditDialogOpen(true);
  };






  const handleAddInformation = () => {


    informationList.push(formData);

    localStorage.setItem("informationList", JSON.stringify(informationList));
    setFormData({
      ...formData,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      description: "",
    });
    setDialogOpen(true);
    setEditDialogOpen(false)
  };

  const handleCardClick = (information: any) => {
    setDialogOpen(false);
    setSelectedInformation(information);
    setFormData({
      ...formData,
      customerName: information.customerName,
      customerPhone: information.customerPhone,
      customerEmail: information.customerEmail,
      customerAddress: information.customerAddress,
      description: information.description,
    });
  };


  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'customerName' && value.trim() === '') {
      setErrors({ ...errors, customerName: 'Name is required' });
    } else if (name === 'customerPhone' && !/^\d+$/.test(value)) {
      setErrors({ ...errors, customerPhone: 'Phone must be a number' });
    } else if (name === 'customerEmail' && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors({ ...errors, customerEmail: 'Invalid email format' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };


  useEffect(() => {

    fetchProvinces();
    const listInfo = localStorage.getItem("informationList");
    const parsedListInfo = listInfo ? JSON.parse(listInfo) : []
    console.log(parsedListInfo);
    setInformationList(parsedListInfo);

  }, []);


  const fetchProvinces = () => {
    fetch(crossUrl + 'https://vapi.vnappmob.com/api/province/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        console.log(data.results);
        setProvinces(data.results)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const fetchDistricts = (provinceId: any) => {
    // Gọi API để lấy danh sách huyện/quận dựa trên 'provinceId'
    // Sau khi lấy được dữ liệu, cập nhật vào state 'districts'
    fetch(crossUrl + 'https://vapi.vnappmob.com/api/province/district/' + provinceId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        console.log(data.results);

        setDistricts(data.results)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const fetchWards = (districtId: any) => {
    // Gọi API để lấy danh sách xã/phường dựa trên 'districtId'
    // Sau khi lấy được dữ liệu, cập nhật vào state 'wards'
    fetch(crossUrl + 'https://vapi.vnappmob.com/api/province/ward/' + districtId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        console.log(data.results);

        setWards(data.results)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleProvinceChange = (event: any) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    fetchDistricts(provinceId);
  };

  const handleDistrictChange = (event: any) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    fetchWards(districtId);
  };

  const hanldeSubmitOrder = () => {
    APISERVICE.postData('order/createOrder', formData)
      .then((data) => {
        if (data.message === 'success') {

          setOrderResponse(data)
          console.log("data", JSON.stringify(data));
          setReturnUrl(data.data.returnUrl);
          console.log("checkoutUrl: ", data.data.checkoutUrl, ', ' + data.data.returnUrl);
          Swal.fire(
            'Ordered',
            'Please check your payment',
            'success'
          );
          setTimeout(() => {
            window.open(data.data.checkoutUrl, '_blank');
          }, 500)
        } else {
          Swal.fire(
            'Order error',
            'Product off stock',
            'error'
          );

        }


      })
      .catch(errors => {
        console.log(errors);
    })
    console.log("object: ", JSON.stringify(formData));

  }

  useEffect(() => {
    console.log("address: ", address);

    setFormData({ ...formData, customerAddress: address })
  }, [address])

  const mapAdress = (name: string) => {
    setAddress(address + ', ' + name)

  }

  const handleDeleteInformation = (index: any) => {
    // Create a copy of the information list
    const updatedList = [...informationList];
    // Remove the item at the specified index
    updatedList.splice(index, 1);
    // Update the state with the new list
    localStorage.setItem("informationList", JSON.stringify(updatedList));

    setInformationList(updatedList);
    setSelectedInformation(undefined)
  };

  // const handleCardClick = (information: any) => {
  //   setSelectedInformation(information);
  //   // Set OrderResponse with the selected information
  //   setOrderResponse(information);
  // };



  return (
    <div>
      {orderResponse ? (

        <Container className="order-form-container">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>

              <Card style={{ margin: '0 auto', width: '60%' }}>
                <Typography variant='h5'>Order Detail</Typography>
                <CardContent>



                  {selectedInformation ? (
                    <div style={{position:'relative'}}>


                     <Typography>Customer Information: </Typography>
                      <div>Name: {selectedInformation.customerName}</div>
                      <div>Phone: {selectedInformation.customerPhone}</div>
                      <div>Email: {selectedInformation.customerEmail}</div>
                      <div>Address: {selectedInformation.customerAddress}</div>
                      <div>Description: {selectedInformation.description}</div>

                      <div style={{top: 0, left: '90%'}} className='locationIcon'>
                        <IconButton onClick={handleOpenDialog}>
                          <AddCircleIcon />
                        </IconButton>
                        <IconButton onClick={handleOpenDialogEdit}>
                          <EditIcon />
                        </IconButton>
                      </div>

                      {/* Buttons for Submit, Add, and Edit */}


                    </div>
                  ) : (

                    <div className='locationContainer'>
                      <div className='locationIcon'>
                        <LocationOnIcon />
                      </div>
                      <IconButton onClick={handleOpenDialog}>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton onClick={handleOpenDialogEdit}>
                        <EditIcon />
                      </IconButton>
                    </div>

                  )}
                  <Typography>Bill Information: </Typography>
                  <div>
                    
                  </div>
                  <Button style={{backgroundColor: '#E9034F'}} onClick={hanldeSubmitOrder} type="submit" variant="contained" className="order-form-button">
                    Order products
                  </Button>
                </CardContent>
              </Card>

              <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Information</DialogTitle>
                <DialogContent>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      sx={{ mb: 2 }} // Margin bottom
                      error={!!errors.customerName}
                      helperText={errors.customerName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      sx={{ mb: 2 }} // Margin bottom
                      error={!!errors.customerPhone}
                      helperText={errors.customerPhone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      sx={{ mb: 2 }} // Margin bottom
                      error={!!errors.customerEmail}
                      helperText={errors.customerEmail}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="customerAddress"
                      value={formData.customerAddress}
                      onChange={handleChange}
                      sx={{ mb: 2 }} // Margin bottom
                    />
                    <FormControl fullWidth>


                      <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                      <Select
                        labelId="province-label"
                        id="province-select"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        sx={{ mb: 2 }} // Margin bottom

                      >
                        {provinces && provinces.map((province: any) => (
                          <MenuItem key={province.province_id} value={province.province_id} onClick={() => mapAdress(province.province_name)}>
                            {province.province_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="district-label">Quận/Huyện</InputLabel>
                      <Select
                        labelId="district-label"
                        id="district-select"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        sx={{ mb: 2 }} // Margin bottom

                      >
                        {districts && districts.map((district: any) => (
                          <MenuItem key={district.district_id} value={district.district_id} onClick={() => mapAdress(district.district_name)}>
                            {district.district_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="ward-label">Xã/Phường</InputLabel>
                      <Select
                        labelId="ward-label"
                        id="ward-select"
                        value={selectedWard}
                        onChange={(event) => setSelectedWard(event.target.value)}
                        sx={{ mb: 2 }} // Margin bottom

                      >
                        {wards && wards.map((ward: any) => (
                          <MenuItem key={ward.ward_id} value={ward.ward_id} onClick={() => mapAdress(ward.ward_name)}>
                            {ward.ward_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextareaAutosize
                      minRows={4}
                      maxRows={8}
                      aria-label="Note"
                      placeholder="Note"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="order-form-textarea"
                      style={{ marginBottom: "20px" }} // Margin bottom
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddInformation}
                    >
                      Add Information
                    </Button>
                    <br />
                  </Grid>
                </DialogContent>
              </Dialog>


              {/* List of MUI cards to display saved information */}
              <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Information List</DialogTitle>
                <DialogContent>
                  {informationList.map((information: any, index) => (
                    <Card key={index} style={{ marginBottom: "20px" }}>
                      <div style={{ cursor: ' pointer' }} onClick={() => handleCardClick(information)}>
                        <CardContent style={{ position: "relative" }}>
                          <div>Name: {information.customerName}</div>
                          <div>Phone: {information.customerPhone}</div>
                          <div>Email: {information.customerEmail}</div>
                          <div>Address: {information.customerAddress}</div>
                          <div>Description: {information.description}</div>
                          <Button
                            onClick={() => handleDeleteInformation(index)}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              color: '#E9034F'
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>





            </Grid>
          </form>
        </Container >
      ) : (<Typography>Must choose a product. </Typography>)
      }
    </div >

  );
};

export default OrderFormComponent;


// {
//   "error": 0,
//   "message": "success",
//   "data": {
//       "checkoutUrl": "https://pay.payos.vn/web/aa1535de6aa14e28b4dfe39723d89098",
//       "returnUrl": "https://localhost:6969/order/updatePaymentStatus/6",
//       "orderCode": 6
//   }