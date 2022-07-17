import React from "react";
import './sidebar.css';
import { LineStyle, SupervisorAccountOutlined, BarChart } from '@material-ui/icons';
import { ListItem } from '@material-ui/core';
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-wrapper'>
                <div className='sidebar-menu'>
                    <h3 className='sidebar-title'>Control Panel</h3>
                    <div className='sidebar-list'>
                        <li>
                            <NavLink to="/" className='sidebar-list-item'>
                                <ListItem button>
                                    <LineStyle className='sidebar-icon'/>
                                    Home
                                </ListItem>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/projections" className='sidebar-list-item'>
                                <ListItem button>
                                    <BarChart className='sidebar-icon'/>
                                    Projections
                                </ListItem>
                            </NavLink>
                        </li>
                    </div>
                    <h3 className='sidebar-title'>Quick Menu</h3>
                    <div className='sidebar-list'>
                        <li >
                                <ListItem button>
                                    <SupervisorAccountOutlined className='sidebar-icon'/>
                                    Administrators
                                </ListItem>
                        </li>
                        <li>
                                <ListItem button>
                                    <BarChart className='sidebar-icon'/>
                                    Analitics
                                </ListItem>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Sidebar;