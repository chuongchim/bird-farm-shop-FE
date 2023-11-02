import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import FooterComponent from '../../Common/Footer/FooterComponent';
import OrderFormComponent from '../../Views/OrderPage/OrderFormComponent';


const OrderPageComponent = () => {
    const [productList, setProductList] = useState([]);

    return (
        <div className='order-page-component'>
            <HeaderComponent></HeaderComponent>
            <Container sx={{ marginTop: '250px' }}>
                <OrderFormComponent listProduct={productList}></OrderFormComponent>
            </Container>
            <FooterComponent></FooterComponent>


        </div>
    );
};

OrderPageComponent.propTypes = {

};

export default OrderPageComponent;