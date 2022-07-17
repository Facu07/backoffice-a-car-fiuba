import React, { useEffect, useState, useCallback } from "react";
import './Projections.css';
import {db} from "../firebase";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function Projections() {

  const [ rentals, setRentalsData ] = useState([]);
  const fetchData = useCallback(async () => {    
    db.collection('rentals').get()
    .then((querySnapshot) => {
      const tempStoresData = [];
      querySnapshot.forEach((doc, i) => {
        console.log(doc.data())
        var tempData = { 
          id: doc.id, 
          status: doc.data().status, 
          multiplier: 0, 
          gmv: 7000000, 
          pricePerHour: 7000,
          estimation: 0
        };
        tempStoresData.push({id: doc.id, ...tempData});
      });
        setRentalsData(tempStoresData);
    });
    console.log(rentals)
  }, [])

  const handleMultiply = (row) => {
    console.log(row.multiplier * row.pricePerHour)
    row.estimation = row.multiplier * row.pricePerHour;
  }

  const columns = [
    {
      field: 'pricePerHour',
      headerName: 'Price per Hour',
      width: 250,
    },
    {
      field: 'multiplier',
      headerName: 'Multiplier',
      width: 250,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
          return (
              <>
              <Button className='users-edit' onClick={() => handleMultiply(params.row)}>
                  Multiply
              </Button>
              </>
          )
      }
  },
  {
    field: 'estimation',
    headerName: 'Estimation',
    width: 250,
  },
  ];

  useEffect(() => {
    fetchData()
      .catch(console.error);
}, [fetchData]);


  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Box className="app-box">
      <Box sx={{ height: 750, width: '100%' }}>
      <DataGrid
        loading={rentals.length === 0}
        rows={rentals}
        columns={columns}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </Box>
      <Grid container>
        <Grid item xs={3}> 
          <Paper>Total</Paper>
        </Grid>
        <Grid item xs={3}> 
          <Paper></Paper>
        </Grid>
        <Grid item xs={3}> 
          <Paper>Sumatoria</Paper>
        </Grid> 
      </Grid>
      </Box>
    </Box>
  );
}

export default Projections;