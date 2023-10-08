import React from 'react';
import { AppBar, Container, Toolbar, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './FooterComponent.css';

const FooterComponent = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FAC74F', top: 'auto', bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar className="footer-content">
          <div className="footer-left">
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <MailOutlineIcon className="footer-icon" />
                <Link href="mailto:contact@yourcompany.com" className="footer-link">
                  <Typography>tttm.mavericks@tttm.com</Typography>
                </Link>
              </div>
              <div className="footer-contact-item">
                <PhoneIcon className="footer-icon" />
                <Link href="tel:+11234567890" className="footer-link">
                  <Typography>+1 (123) 456-7890</Typography>
                </Link>
              </div>
              <div className="footer-contact-item">
                <LocationOnIcon className="footer-icon" />
                <Typography className="footer-text">
                  123 Main Street, Your City, Country, ZIP Code
                </Typography>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <Typography variant="h6" className="footer-title">
              Connect with Us
            </Typography>
            <div className="footer-social">
              <IconButton>
                <Link href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="footer-icon" />
                </Link>
              </IconButton>
              <IconButton>
                <Link href="https://twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className="footer-icon" />
                </Link>
              </IconButton>
              <IconButton>
                <Link href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="footer-icon" />
                </Link>
              </IconButton>
              <IconButton>
                <Link href="https://www.youtube.com/yourcompany" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon className="footer-icon" />
                </Link>
              </IconButton>
            </div>
          </div>
        </Toolbar>
        <Typography variant="body2" className="footer-text" sx={{ textAlign: 'center', paddingBottom: 2, marginTop: '60px' }}>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </Typography>
      </Container>
    </AppBar>
  );
};

export default FooterComponent;
