import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import About from '../About/About';
import Communication from '../Communication/Communication';
import Projects from "../Projects/Projects";
import Home from '../Home/Home';
import './Neuromorphic.css'
// import './MyRouter.css'




class MyRouter extends Component {

    render () {
        return (     
            <div className="frame">
                {/* <header> */}
                    <nav>
                    
                       
                        <a class="btn">
                            <li ><NavLink to="/" exact>
                                
                                    HOME.
                                
                            </NavLink></li>
                    </a>

                    <a class="btn">
                            <li ><NavLink to="/" exact>
                                
                                    ABOUT.
                                
                            </NavLink></li>
                            </a>
                            
                            <li ><NavLink to="/" exact>
                                <a class="btn">
                                    PROJECTS.
                                </a>
                            </NavLink></li>

                            <li ><NavLink to="/" exact>
                                <a class="btn">
                                    COMS.
                                </a>
                            </NavLink></li>
                       
                    </nav>
                {/* </header> */}



                <Switch>
                            <Route path="/About" component={About} />
                            <Route path="/Projects" component={Projects} />
                            <Route path="/Communication" component={Communication} />
                            <Route path="/" exact component={Home} />


                </Switch>

            </div>
           
        );
    }
}

export default MyRouter; 