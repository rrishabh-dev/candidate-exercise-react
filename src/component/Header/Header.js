import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { AppBar, Box, IconButton, Link, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';

import './Header.scss';

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
