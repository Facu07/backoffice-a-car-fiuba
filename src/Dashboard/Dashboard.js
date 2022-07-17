import React from 'react';
import { Sidebar, Topbar } from '../components';
import App from '../Home/Home';
import './Dashboard.css';
import Projections from '../Projections/Projections';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

const Dashboard = () => {


    return (
        <Box className='dashboard-container' sx={{ flexGrow: 1 }}>
          <div className='top-panel'>
            <Topbar />
          </div>
          <div className='container' >
            <div className='side-panel'>
              <Sidebar />
            </div>
            <Routes>
                <Route exact path="/" element={<App/>}/>
                <Route exact path="/projections" element={<Projections/>}/>
            </Routes>
          </div>
        </Box>
    );
  }
  
  export default Dashboard;