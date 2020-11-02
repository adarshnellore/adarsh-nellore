import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import MyRouter from './containers/MyRouter/MyRouter';
import { ParallaxProvider } from 'react-scroll-parallax';



class App extends Component {
    render() {
      return (
        <ParallaxProvider>
        <BrowserRouter>
          <div>
            <MyRouter/>
          </div>
        </BrowserRouter>
        </ParallaxProvider>
      );
    }
  }
  
  export default App;
  