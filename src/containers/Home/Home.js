import React, { Component } from 'react';
import classes from './Home.css'

import Clock from 'react-live-clock';
import './Home.css'

class Home extends Component{

    render () {
        return (
            <div id="Home" >
          
                <h1>Adarsh Nellore</h1>
                
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'}  />

                <label>{"\n"} Developed with react.js</label>
              
               
                
            </div>
        );
}
}

export default Home;