import React, { useEffect, useState, useCallback } from "react";
import './App.css';
import {db} from "./firebase";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const theme = createTheme();

function App() {

  const [ rentals, setRentalsData ] = useState([]);
  const [ loading, setLoading]  = useState(true);

  const fetchData = useCallback(async () => {
    const tempStoresData = [];
    db.collection('rentals').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempStoresData.push({id: doc.id, ...doc.data()});
      });
        setRentalsData(tempStoresData);
    });
  }, [])

  useEffect(() => {
    fetchData()
      .then(_ => setLoading(false))
      .catch(console.error);
}, [fetchData]);

if (loading) {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Typography component="h1" variant="h5">
          Loading.. Please Wait...
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
        {rentals.map((rent, index) => {
        return(
          <Grid container key={index}>
            <Grid item xs={3}> 
              <Paper>{rent.status}</Paper>
            </Grid>
            <Grid item xs={3}> 
              <Button onClick={() => console.log("multiplica pa")}>Multiply</Button>
            </Grid>
            <Grid item xs={3}> 
              <Paper>U$D 7.000.000</Paper>
            </Grid> 
          </Grid>
        )
        })}
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
  );
}

export default App;
