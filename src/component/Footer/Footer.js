import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className='footer'>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Task Manager is created by Rishabh Gupta.
        </Typography>
        <Typography variant="body2">
          For more details contact me at rrishabh@gmail.com.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
