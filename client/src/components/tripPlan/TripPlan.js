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
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column', // Set display to flex
        // justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        borderRadius: 1,
        bgcolor: 'primary.main',
        marginTop: theme.spacing(1),
        boxShadow: '10px 1px 15px rgba(0, 0, 0, 0.5)',
      }}
    >
        
      <Typography variant="h3" component="h2" sx={{fontFamily:'inherit',mt:"50px",fontWeight:"600"}}>
        Trip Plan
      </Typography>
      <TripItems/>
    </Box>
  )
}

export default TripPlan