// import { Link } from 'react-router-dom'
import Switch from "@mui/material/Switch";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import './Navbar.css'
import { Box, Button, Link, IconButton} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { auto } from "@popperjs/core";

function Navbar({ toggleDark, setToggleDark }) {
  const theme = useTheme()

  const handleThemeChange = () => {
    setToggleDark(!toggleDark);
  };


  const linkStyles = {
    textDecoration: 'none',
    marginRight: theme.spacing(7),
    fontSize : "20px",
    fontWeight: '500px',
    color: theme.palette.text.primary,
  };

  return (

    <AppBar position="static" sx={{ height: 55 ,backgroundColor: 'primary.main',backgroundImage: 'none' }}>
      <Toolbar >
        <Typography  fontSize="30px" fontWeight="600" sx={{fontFamily:'inherit',}} marginRight={theme.spacing(50)}>
          NESSCO
        </Typography>

        <Link href="#" sx={linkStyles} underline="none" >
          About
        </Link>
        <Link href="#" sx={linkStyles} underline="none">
          Services
        </Link>
        <Link href="#" sx={linkStyles} underline="none">
          Contact
        </Link>
        <Link href="#" sx={linkStyles} underline="none">
          Sign Up
        </Link>
        <Link href="#" sx={linkStyles} underline="none">
          Sign In
        </Link>
        <IconButton sx={{ ml: auto }} onClick={handleThemeChange} color="inherit" marg >
        {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar