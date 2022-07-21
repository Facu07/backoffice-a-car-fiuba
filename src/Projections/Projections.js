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
  const [ total, setTotal ] = useState(0);
  const fetchData = useCallback(async () => {    
    db.collection('rentals').get()
    .then((querySnapshot) => {
      const tempStoresData = [];
      querySnapshot.forEach((doc, i) => {
        var tempData = { 
          id: doc.id, 
          status: doc.data().status, 
          multiplier: 0, 
          total: doc.data().total, 
          pricePerHour: doc.data().pricePerHour,
          estimation: 0
        };
        tempStoresData.push({id: doc.id, ...tempData});
      });
        setRentalsData(tempStoresData);
    });
  }, [])

  const handleMultiply = (row) => {
    row.estimation = row.multiplier * row.total;
    setTotal(total+row.estimation);
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 250,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 250,
      renderCell: (params) => {
        return (
            <>
              ${params.row.total}
            </>
        )
    }
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
    renderCell: (params) => {
      return (
          <>
            ${params.row.estimation}
          </>
      )
  }
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
          <Paper>${total}</Paper>
          <Paper>Total</Paper>
        </Grid>
        <Grid item xs={3}> 
          <Paper></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>${Math.floor(total * 0.07)}</Paper>
          <Paper>Revenue</Paper>
        </Grid> 
      </Grid>
      </Box>
    </Box>
  );
}

export default Projections;