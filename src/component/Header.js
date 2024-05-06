import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import './Header.css';

const pages = ['Create Task', 'View Task'];

const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleLogOut = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className='header-toolbar'>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            className='header-main-heading'
          >
            TASK MANAGER
          </Typography>

          <Box className='hamburger-menu'>
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      underline='none'
                      variant="button"
                      onClick={() => page === 'Create Task' ? navigate('/create-task') : navigate('/')}
                    >
                      {page}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Tooltip title="Log Out">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleLogOut}
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
