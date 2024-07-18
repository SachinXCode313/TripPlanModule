
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Box } from '@mui/material';
import { useTheme } from '@emotion/react';



const columns = [
  { id: 'action', label: 'Action', minWidth: 130 },
  { id: 'sr', label: 'Sr.', minWidth: 70 },
  { id: 'date', label: 'Date', minWidth: 150 },
  { id: 'day', label: 'Day', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 170 },
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



const TripItems = ({ tripPlanData }) => {
  const theme = useTheme()

  const handleSubmit= () => {
    console.log(tripPlanData)
  }

  return (

    <>
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
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ py: '3px' }}>
                            {column.id === 'action'
                              ? <>
                                <IconButton >
                                  <EditIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                </IconButton>

                                <IconButton >
                                  <DeleteIcon sx={{ color: theme.palette.buttonBG.primary }} />
                                </IconButton>
                              </>
                              : "ranu"}

                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
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
          sx={{
            color: theme.palette.buttonText.primary,
            backgroundColor: theme.palette.buttonBG.primary,
            borderRadius: "20px",
            '&:hover': {
              backgroundColor: theme.palette.buttonBG.hover,
            },
          }}>Clear</Button>
      </Box>

    </>
  );
}

export default TripItems;
