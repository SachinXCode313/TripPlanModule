import React, { useState } from 'react';
import Switch from "@mui/material/Switch";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Link, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import './Navbar.css';

function Navbar({ toggleDark, setToggleDark }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleThemeChange = () => {
        setToggleDark(!toggleDark);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const linkStyles = {
        textDecoration: 'none',
        marginRight: theme.spacing(5),
        fontSize: "20px",
        fontWeight: '400',
        color: theme.palette.text.primary,
    };

    const menuItems = ['About', 'Services', 'Contact', 'Sign Up', 'Sign In'];

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'primary.main', backgroundImage: 'none', }}>
                <Toolbar>
                    <Typography fontSize="30px" fontWeight="600" sx={{ fontFamily: 'inherit', flexGrow:"1"  }}>
                        NESSCO
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton onClick={handleThemeChange} color="inherit" sx={{mx:"5px"}}>
                                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>

                            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                                <Box
                                    role="presentation"
                                    onClick={handleDrawerToggle}
                                    onKeyDown={handleDrawerToggle}
                                    sx={{ width: 150 }}
                                >
                                    <Toolbar>
                                        <Typography sx={{ marginRight: "50px" }}>Menu</Typography>
                                        <IconButton onClick={handleDrawerToggle} >
                                            <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                                    <Divider />
                                    <List>
                                        {menuItems.map((text) => (
                                            <ListItem button key={text}>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>

                        </>
                    ) : (
                        <>
                        
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: "500" }}>
                                {menuItems.map((text) => (
                                    <Link href="#" sx={linkStyles} underline="none" key={text}>
                                        {text}
                                    </Link>
                                ))}
                            </Box>

                            

                            <IconButton sx={{ ml: 'auto' }} onClick={handleThemeChange} color="inherit">
                                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
