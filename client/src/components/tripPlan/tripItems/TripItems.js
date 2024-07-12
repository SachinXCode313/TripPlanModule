import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
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

];

export default function TripItems() {
  const theme = useTheme()

  return (
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
        mt: "100px"
      }
      }>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{py:'3px'}}>
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
  );
}
