import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import FooterComponent from '../../Common/Footer/FooterComponent';


const OrderPageComponent = () => {
    return (
        <div className='order-page-component'>
            <HeaderComponent></HeaderComponent>
            <FooterComponent></FooterComponent>


        </div>
    );
};

OrderPageComponent.propTypes = {
    
};

export default OrderPageComponent;