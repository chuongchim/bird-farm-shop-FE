import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import './OrderForm.css'; 


const OrderForm = () => {
  const [order, setOrder] = useState({
    CustomerID: '',
    customerPhone: '',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    note: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Thông tin đơn hàng:', order);
  };

  const inputStyle = { height: '30px', margin: '20px' };

  return (
    <Container className="order-form-container" sx={{width: '800px'}}>
      <Typography className="form-title" variant="h5" gutterBottom>
        Đơn Hàng
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className="form-input"
          fullWidth
          name="CustomerID"
          label="Mã Khách Hàng"
          variant="outlined"
          value={order.CustomerID || ''}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}
        //   inputProps={{ style: inputStyle }}
        />
        <TextField
          className="form-input"
          fullWidth
          name="customerPhone"
          label="Số Điện Thoại"
          variant="outlined"
          value={order.customerPhone}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}

        //   inputProps={{ style: inputStyle }}

        />
        <TextField
          className="form-input"
          fullWidth
          name="customerName"
          label="Họ và Tên"
          variant="outlined"
          value={order.customerName}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}

        //   inputProps={{ style: inputStyle }}

        />
        <TextField
          className="form-input"
          fullWidth
          name="customerEmail"
          label="Email"
          variant="outlined"
          value={order.customerEmail}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}

        //   inputProps={{ style: inputStyle }}

        />
        <TextField
          className="form-input"
          fullWidth
          name="customerAddress"
          label="Địa Chỉ"
          variant="outlined"
          value={order.customerAddress}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}

        //   inputProps={{ style: inputStyle }}

        />
        <TextField
          className="form-input"
          fullWidth
          name="note"
          label="Ghi Chú"
          variant="outlined"
          value={order.note}
          onChange={handleInputChange}
          sx={{margin: '20px', width: '60%', height: '30px'}}

        //   inputProps={{ style: inputStyle }}

        />
        <Button
          className="submit-button"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{margin: '20px', width: '60%', height: '30px'}}

          

        >
          Đặt Hàng
        </Button>
      </form>
    </Container>
  );
};

export default OrderForm;
