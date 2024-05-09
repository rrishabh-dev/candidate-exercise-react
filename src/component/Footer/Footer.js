import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';

import './Footer.scss';

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
