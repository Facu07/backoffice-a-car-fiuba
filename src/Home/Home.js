import React, { useEffect, useState, useCallback } from "react";
import './Home.css';
import {db} from "../firebase";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const Home = () => {

  const [ rentals, setRentalsData ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const fetchData = useCallback(async () => {  
    let sum = 0;  
    db.collection('rentals').get()
    .then((querySnapshot) => {
      const tempStoresData = [];
      querySnapshot.forEach((doc, i) => {
        console.log(doc.data())
        var tempData = { 
          id: doc.id, 
          status: doc.data().status, 
          gmv: doc.data().total, 
          pricePerHour: doc.data().pricePerHour,
        };
        if(tempData.status === 'FINISHED'){
          sum += tempData.gmv;
        };
        tempStoresData.push({id: doc.id, ...tempData});
      });
      setTotal(sum);
      setRentalsData(tempStoresData);
    });
    console.log(rentals)
  }, [db])

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      renderCell: (params) => {
        return (
            <>
            <Button style={handleStatus(params.row.status)} disabled>
              {params.row.status}
            </Button>
            </>
        )
    }
    },
    {
      field: 'gmv',
      headerName: 'GMV',
      width: 250,
      renderCell: (params) => {
        return (
            <>
              ${params.row.gmv}
            </>
        )
    }
    },
    {
      field: 'pricePerHour',
      headerName: 'Price per Hour',
      width: 250,
      renderCell: (params) => {
        return (
            <>
              ${params.row.pricePerHour}
            </>
        )
    }
    },
  ];

  useEffect(() => {
    fetchData()
      .catch(console.error);
}, [fetchData]);

const handleStatus = (status) => {
  if(status === 'CANCELLED'){
    return {
      color: "white",
      backgroundColor: "Red",
      padding: "10px",
      fontFamily: "Arial"
    };
  }
  if(status === 'OPEN'){
    return {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };  
  }
  return {
    color: "white",
    backgroundColor: "Green",
    padding: "10px",
    fontFamily: "Arial"
  };
}


  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Box className="app-box">
      <Box sx={{ height: 700, width: '100%' }}>
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

export default Home;