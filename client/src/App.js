import './App.css';
import Navbar from './components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { CssBaseline, toggleButtonClasses } from '@mui/material';
import Background from './components/background/Background';
import PaymentFields from './components/paymentFields/PaymentFields';
import Blur from 'react-blur'
import TripPlan from './components/tripPlan/TripPlan';


function App() {
  const [toggleDark, setToggleDark] = useState(false)

  const theme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary: {
        main: toggleDark ? '#141414' : '#fff', // Use a dark color for dark mode, and white for light mode
      },
      text: {
        primary: toggleDark ? '#fff' : '#000', // Ensure text color changes accordingly
      },
      inputBorder: {
        primary: toggleDark ? '#C4C4C4' : '#C2C2C2',
      },
      inputText: {
        primary: toggleDark ? '#B9B9B9' : '#606060',
      },
      buttonText: {
        primary: toggleDark ? '#000' : '#fff',
      },
      buttonBG: {
        primary: toggleDark ? '#ebebeb' : '#171717',
        hover: toggleDark ? '#c7c5c5' : '#333333',
      },
      bgColor: {
        primary: toggleDark ? 'linear-gradient(90deg, #c8c8c833 1px, #fff0 0),linear-gradient(180deg, #c8c8c899 1px, #fff0 0)' : 'linear-gradient(90deg, #0003 1px, #0000 0), linear-gradient(180deg, #0003 1px, #0000 0)',
      },
      border: {
        primary: toggleDark ? '#C4C4C4' : '#C4C4C4',
      },
      borderHover: {
        primary: toggleDark ? 'black' : 'white',
      },
    },
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleDark={toggleDark} setToggleDark={setToggleDark} />
        <Background />
        <PaymentFields />
        <TripPlan />



      </ThemeProvider>


    </>
  );
}

export default App;


