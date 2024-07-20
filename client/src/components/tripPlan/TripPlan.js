import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import './TripPlan.css'
import { useTheme } from '@emotion/react'
import TripItems from './tripItems/TripItems'
import { Button, Snackbar, Alert } from '@mui/material'
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SubmitButton from './SubmitButton'
import EditTripModal from '../paymentFields/dateModule/EditTripModal'


const columns = [
  { id: 'action', label: 'Action', minWidth: 130 },
  { id: 'sr', label: 'Sr.', minWidth: 50 },
  { id: 'date', label: 'Date', minWidth: 110 },
  { id: 'day', label: 'Day', minWidth: 60 },
  { id: 'country', label: 'Country', minWidth: 120 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'clientName', label: 'Client Name', minWidth: 100 },
  { id: 'purpose', label: 'Purpose', minWidth: 100 },
  { id: 'Remarks', label: 'Remarks', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },

  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];


function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),


];


const TripPlan = ({ tripPlanList,handleClearData }) => {
  const theme = useTheme()
  const [tripPlanData, setTripPlanData] = React.useState(tripPlanList);
  const [EditModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  React.useEffect(() => {
    setTripPlanData(tripPlanList);
  }, [tripPlanList]);

  const handleEditModalOpen = (index) => {
    setEditModalOpen(true);
    setSelectedIndex(index);
    console.log(index);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditTripPlanList = (formData, index) => {
    setTripPlanData(prevList => {
      // Create a new list with updated data
      const updatedList = prevList.map((trip, i) =>
        i === index ? { ...trip, ...formData } : trip
      );
      console.log("Updated Trip Plan List:", updatedList);
      return updatedList;
    });
  };

  const handleDelete = async (index) => {
    const itemToDelete = tripPlanData[index]; // Assuming tripPlanData is an array and index corresponds to the item

    // Prepare data for the API request
    const data = {
      sr: itemToDelete.sr,
      date: itemToDelete.date,
    };

    try {
      const res = await axios.post('http://localhost:3000/api/deletePlan', data)
      console.log("data is appended")
    } catch (error) {
      console.error('Error:', error);
    }

    setTripPlanData(prevList => {
      const newList = prevList.filter((_, i) => i !== index);
      setSnackbarMessage('Row deleted successfully!');
      setSnackbarOpen(true);
      return newList;
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/create', tripPlanData)
      console.log("data is appended")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = () => {
    handleClearData()
    setTripPlanData([]);
  };



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
        mx: 'auto'
      }}
    >

      <Typography variant="h3" component="h2" sx={{ fontFamily: 'inherit', mt: "50px", fontWeight: "600", textAlign: 'center' }}>
        Trip Plan
      </Typography>
      {/* <TripItems tripPlanData={tripPlanList} /> */}






      <Paper
        sx={{
          width: {
            xs: '90%', // Set width to 100% for extra-small screens
            sm: '80%',  // Set width to 80% for small screens
            md: '70%',  // Set width to 70% for medium screens
            lg: '60%',  // Set width to 60% for large screens
            xl: '70%',  // Set width to 50% for extra-large screens
          },
          overflow: 'hidden',
          mt: "60px"
        }
        }>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <thead class="MuiTableHead-root css-1wbz3t9" sx={"background-color: black;"}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </thead>
            {tripPlanData && tripPlanData.length > 0 && (
              <TableBody>
                {tripPlanData.map((tripPlan, innerIndex) => (
                  <TableRow hover key={innerIndex}>
                    <TableCell>
                      <IconButton>
                        <EditIcon
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditModalOpen(innerIndex);
                          }}
                          sx={{ color: theme.palette.buttonBG.primary }} />
                      </IconButton>
                      <EditTripModal
                        open={EditModalOpen}
                        handleClose={handleEditModalClose}
                        initialData={tripPlanList}
                        setTripPlanList={handleEditTripPlanList}
                        index={selectedIndex}
                      />
                      <IconButton onClick={() => handleDelete(innerIndex)}>
                        <DeleteIcon sx={{ color: theme.palette.buttonBG.primary }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>{tripPlan.sr}</TableCell>
                    <TableCell>{tripPlan.date}</TableCell>
                    <TableCell>{tripPlan.day}</TableCell>
                    <TableCell>{tripPlan.country}</TableCell>
                    <TableCell>{tripPlan.state}</TableCell>
                    <TableCell>{tripPlan.city}</TableCell>
                    <TableCell>{tripPlan.clientName}</TableCell>
                    <TableCell>{tripPlan.purpose}</TableCell>
                    <TableCell>{tripPlan.remarks}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            )}
          </Table>
        </TableContainer>


      </Paper>
      <Box sx={{ mt: "50px" }}>
        <Button variant="contained"
          onClick={handleSubmit}
          sx={{
            color: theme.palette.buttonText.primary,
            backgroundColor: theme.palette.buttonBG.primary,
            borderRadius: "20px",
            mr: "30px",
            '&:hover': {
              backgroundColor: theme.palette.buttonBG.hover,
            },
          }}>Submit</Button>
        <Button variant="contained"
          onClick={handleClear}
          sx={{
            color: theme.palette.buttonText.primary,
            backgroundColor: theme.palette.buttonBG.primary,
            borderRadius: "20px",
            '&:hover': {
              backgroundColor: theme.palette.buttonBG.hover,
            },
          }}>Clear</Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 20 }}  // Positioning the Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  )
}

export default TripPlan