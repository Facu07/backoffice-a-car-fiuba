import React from "react";
import './topbar.css';
import logo from '../../img/logo.png';
import { Link, Avatar } from '@material-ui/core';

const user = {
  firstName: 'Acar',
  lastName: 'Admin'
}

function Topbar() {

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
      }

    function stringAvatar() {
      let name = user.firstName + ' ' + user.lastName;
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    return (
        <div className='topbar'>
            <div className='top-wrapper'>
                <div className='top-left'>   
                    <Link href="/images/ubademylogo.png" >
                        <div>
                            {<img src={logo} className="logo" alt="logo" />}
                        </div>
                    </Link>
                </div>
                <div className='top-right'>
                    <Avatar className='topbar-icons-container' {...stringAvatar()} />
                </div>
            </div>
        </div>
    )
}

export default Topbar;