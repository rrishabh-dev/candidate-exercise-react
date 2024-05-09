import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    if (input?.email === loggedInUser?.email && input?.password === loggedInUser?.password) {
      localStorage.setItem('loggedIn', true);
      navigate('/');
    } else {
      alert('Wrong Credentials Entered !!');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box className='login-main-box'>
        <Avatar className='login-lock-icon'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate  className='login-form-container'>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={input?.email}
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={input?.password}
            onChange={(e) => {
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className='log-in-btn'
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
