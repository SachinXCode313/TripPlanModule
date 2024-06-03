import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import './TripPlan.css'
import { useTheme } from '@emotion/react'
import TripItems from './tripItems/TripItems'

const TripPlan = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        // width: '100%',
        // width: {
        //   xs: '90%', // Set width to 100% for extra-small screens
        //   sm: '80%',  // Set width to 80% for small screens
        //   md: '70%',  // Set width to 70% for medium screens
        //   lg: '60%',  // Set width to 60% for large screens
        //   xl: '50%',  // Set width to 50% for extra-large screens
        // },
        maxWidth: 'xxl',

        height: '100vh',
        display: 'flex',
        flexDirection: 'column', // Set display to flex
        // justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        borderRadius: 1,
        bgcolor: 'primary.main',
        marginTop: theme.spacing(1),
        boxShadow: '10px 1px 15px rgba(0, 0, 0, 0.5)',
        mx:'auto'
      }}
    >

      <Typography variant="h3" component="h2" sx={{ fontFamily: 'inherit', mt: "50px", fontWeight: "600", textAlign: 'center'}}>
        Trip Plan
      </Typography>
      <TripItems />
    </Box>
  )
}

export default TripPlan