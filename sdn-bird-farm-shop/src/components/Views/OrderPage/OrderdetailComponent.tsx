import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  Button,
} from '@mui/material';
import { json, useParams } from 'react-router-dom';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import FooterComponent from '../../Common/Footer/FooterComponent';
import Swal from 'sweetalert2';
import { crossUrl } from '../../../api/ApiConfig';

interface Product {
  _id: string;
  birdName: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerID: string;
  customerName: string;
  customerPhone: number;
  customerAddress: string;
  customerEmail: string;
  amount: number;
  date: string;
  orderStatus: string;
  productList: Product[];
}

interface payForm {
  code: string,
  desc: string,
  data: {
    bin: string,
    accountNumber: string,
    accountName: string,
    amount: number,
    description: string,
    orderCode: number,
    paymentLinkId: string,
    status: string,
    checkoutUrl: string,
    qrCode: string,
  },
  signature: string
}

const OrderDetailComponent: React.FC = () => {
  const decodeObj = localStorage.getItem("decode"); // Don't parse it yet
  const decodedValue = decodeObj ? JSON.parse(decodeObj) : '';
  const { _id } = useParams();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [paymentData, setPaymentData] = useState<payForm | null>(null);
  const [paymentStatus, setPaymentStatus] = useState('')

  useEffect(() => {

    fetch("http://localhost:5000/v1/order/" + `${_id}`, {
      method: "GET",
      headers: {
        "token": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*',
        "Accept": "/",
        "X-Requested-With": "XMLHttpRequest",
        "Cache-Control": "no-cache"
      }
    }).then((responseStatus) => {
      console.log(responseStatus);
      if (responseStatus.status === 200) {

        return responseStatus.json();

      }
    }).then((res: Order) => {
      console.log(res);
      if (res.customerID !== decodedValue.id) {
        window.location.href = '/error'
        console.log(res.customerID);
        console.log(decodedValue.id);

      } else {
        console.log(res);
        setOrderData(res)
      }
    }
    ).catch(error => {
      // toast.error('Authentication faild!')
    })
    console.log("orderData.customerId != decodedValue.id: ", decodedValue.id);


    // if (paymentData) {
    //   let status = ""

    //   fetch(crossUrl + "https://api-merchant.payos.vn/v2/payment-requests/" + `${paymentData.data.orderCode}`,
    //     {
    //       headers: {
    //         "x-client-id": "9493a6a9-258f-4022-b69f-7b5ebb2274e7",
    //         "x-api-key": "0cdcad04-9e1e-4b85-82f2-e10c466a2d16"
    //       }
    //     })
    //     .then(res => res.json())
    //     .then((response: any) => {
    //       if (response.code === "00") {
    //         setPaymentStatus(response.data.status)
    //         status = response.data.status
    //         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //         if (response.data.status === "PAID") {
    //         }
    //       }
    //     }).catch((err) => {
    //       Swal.fire(
    //         'Do not pay yet!',
    //         'Your product has been Order !!! Please pay your order',
    //         'error'
    //       );
    //     })
    // }

    // Cleanup the interval when the component unmounts

  }, []);

  // let paymentStatus = "";

  // Fetch payment status every 5 seconds
  // Fetch payment status every 5 seconds



  const handlePayment = async () => {
    if (orderData) {
      console.log(orderData._id);

      await fetch('http://localhost:5000/v1/gateway/createOrder/' + `${orderData._id}`,
        {
          method: "POST",
          headers: {
            // "token": `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": '*',
            "Accept": "/",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache"
          },
        }).then((responseStatus) => {
          console.log(responseStatus);
          if (responseStatus.status === 200) {

            return responseStatus.json();

          }
        })
        .then((response: any) => {
          if (response.code === "00") {
            setPaymentData(response);
            Swal.fire(
              'Order Success!',
              'Your product has been Order !!! Please pay your order',
              'success'
            );
            const url = response.data.checkoutUrl
            if (url) {
              setTimeout(() => {
                window.open(url, '_blank')
              }, 600);
            }
          } else {
            Swal.fire(
              'Payment fail!',
              `${JSON.stringify(response)}`,
              'error'
            );
          }

        })
    }


  }

  const handlePaymentCheck = () => {

    if (paymentData) {
      console.log(paymentData.data.orderCode);

      fetch(crossUrl + "https://api-merchant.payos.vn/v2/payment-requests/" + paymentData.data.orderCode, {
        headers: {
          "x-client-id": "9493a6a9-258f-4022-b69f-7b5ebb2274e7",
          "x-api-key": "0cdcad04-9e1e-4b85-82f2-e10c466a2d16"
        }
      })
        .then(res => res.json())
        .then((response) => {
          if (response.code === "00") {
            let paymentStatus = response.data.status;
            console.log("Payment Status: ", paymentStatus);
            setPaymentStatus(paymentStatus);

            if (paymentStatus === "PAID" || paymentStatus === "SUCCESS") {


              // If payment is successful, send a cancellation request after 30 iterations
              if (paymentStatus === "PAID" || paymentStatus === "SUCCESS") {
                Swal.fire(
                  'You paid!',
                  `${JSON.stringify(response)}`,
                  'success'
                );
                changeOrderStatus();
              }
            }
          }
        })
        .catch((err) => {
          Swal.fire(
            'Do not pay yet!',
            'Your product has been ordered! Please pay your order.',
            'error'
          );
        });
    } else {
      Swal.fire(
        'Do not pay yet!',
        'Your product has been ordered! Please pay your order.',
        'error'
      );
    }

  }

  const cancelPayment = () => {
    if (paymentData) {
      fetch(`https://api-merchant.payos.vn/v2/payment-requests/${paymentData.data.orderCode}/cancel?`, {
        method: "POST",
        headers: {
          "x-client-id": "9493a6a9-258f-4022-b69f-7b5ebb2274e7",
          "x-api-key": "0cdcad04-9e1e-4b85-82f2-e10c466a2d16"
        }
      })
        .then((cancelResponse) => {
          // Handle the cancellation response
          Swal.fire(
            'Do not pay yet!',
            `${JSON.stringify(cancelResponse)}`,
            'error'
          );
        })
        .catch((cancelError) => {
          console.error("Error while canceling order: ", cancelError);
        });
    } else {
      Swal.fire(
        'Do not pay yet!',
        'Your product has been ordered! Please pay your order.',
        'error'
      );
    }

  }

  const changeOrderStatus = () => {
    fetch("http://localhost:5000/v1/order/update/" + `${_id}`,
      {
        method: "PUT",
        headers: {
          // "token": `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": '*',
          "Accept": "/",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache"
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.message !== "") {
          location.reload()
        }
      })

      setTimeout(() => {
        if (orderData) {

          orderData.productList.map((item)=> {
            
          })
        }
      }, 1000);
  }

  if (!orderData) {
    return <div>Loading...</div>; // You can replace this with a loading spinner.
  }
  // else if (orderData.customerId != decodedValue.id) {
  //   window.location.href = '/error'
  // }

  return (
    <div>
      {/* Header */}
      <HeaderComponent />

      {/* Main content container */}
      <Container maxWidth="md" sx={{ marginTop: '250px' }}>
        <Typography variant="h4" align="center">
          Order Detail
        </Typography>

        {/* Customer Information */}
        <div style={{ padding: '1px', width: '50%', margin: '0 auto', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                <Typography variant="h6">Customer Information</Typography>
                <Typography>{`Customer Name: ${orderData.customerName}`} </Typography>
                <Typography>{`Customer Phone: ${orderData.customerPhone}`} </Typography>
                <Typography>{`Customer Address: ${orderData.customerAddress}`} </Typography>
                <Typography>{`Customer Email: ${orderData.customerEmail}`} </Typography>
              </List>

            </Grid>

            {/* Order Information */}
            <Grid item xs={12}>
              <Typography variant="h6">Order Information</Typography>
              <List>

                <Typography>{`Order ID: ${orderData._id}`} </Typography>

                <Typography>{`Order Amount: $${orderData.amount}`} </Typography>

                <Typography>{`Order Date: ${new Date(orderData.date).toLocaleString()}`} </Typography>

                <Typography style={{ float: 'left' }}>Order Status: <span style={{ color: orderData.orderStatus === 'Pending' ? '#E13C2F' : '#1B9A08' }}>{orderData.orderStatus}</span> </Typography>
              </List>
            </Grid>

            {/* Product List */}
            <Grid item xs={12}>
              <Typography variant="h6">Product List</Typography>
              {orderData.productList.map((product, index) => (
                <>
                  <List>
                    <Typography>{`Product Name: ${product.birdName}`} </Typography>

                    <Typography>{`Price: $${product.price}`} </Typography>

                    <Typography>{`Quantity: ${product.quantity}`}</Typography>
                  </List>
                </>
              ))}
            </Grid>
          </Grid>

          {/* Payment Button */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>


              <Button disabled={orderData.orderStatus === "PAID" ? true : false} style={{ backgroundColor: "#1CA508" }} onClick={handlePaymentCheck} variant="contained" fullWidth>
                Check Payment
              </Button>

            </Grid>

            <Grid item xs={12} sm={6}>
              <Button style={{ backgroundColor: "#E9034F" }} disabled={orderData.orderStatus === "PAID" ? true : false} onClick={cancelPayment} variant="contained" fullWidth>
                Cancel
              </Button>
            </Grid>

          </Grid>
          <Grid sx={{ marginTop: "20px" }} item xs={12} sm={4}>
            <Button style={{ backgroundColor: "#FAC74F" }} disabled={orderData.orderStatus === "PAID" ? true : false} onClick={handlePayment} variant="contained" fullWidth>
              Payment
            </Button>


          </Grid>
          {/* <Button style={{ width: '200px', backgroundColor: '#E9034F' }} onClick={handlePayment}>
            Payment
          </Button> */}
        </div>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </div>


  );
};

export default OrderDetailComponent;
