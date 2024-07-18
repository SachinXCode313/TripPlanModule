import { useTheme } from '@emotion/react'
import React from 'react'
import { Button } from '@mui/material';


const SubmitButton = () => {
    const theme = useTheme();
    return (
        <>
            <Button variant="contained"
                sx={{
                    color: theme.palette.buttonText.primary,
                    backgroundColor: theme.palette.buttonBG.primary,
                    borderRadius: "20px",
                    mr: "30px",
                    '&:hover': {
                        backgroundColor: theme.palette.buttonBG.hover,
                    },
                }}>Submit</Button>
        </>
    )
}

export default SubmitButton