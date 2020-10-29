import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import About from '../About/About';
import Communication from '../Communication/Communication';
import Projects from "../Projects/Projects";
import Home from '../Home/Home';
import './MyRouter.css';


class MyRouter extends Component {

    render () {
        return (     
            <div className="MyRouter">
                <header>
                    <nav>
                        <ul className="navbar">
                        <li className="navbar__link"><NavLink
                                to="/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#ff0000'
                                }}
                                >HOME.</NavLink></li>


                            <li className="navbar__link"><NavLink
                                to="/About/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#ff0000'
                                }}>ABOUT.</NavLink></li>

                            <li className="navbar__link"><NavLink
                                to="/Projects/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#ff0000'
                                }}>PROJECTS.</NavLink></li>

                            <li className="navbar__link"><NavLink
                                to="/Communication/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#ff0000'
                                }}>COMMUNICATION.</NavLink></li>

                        </ul>
                    </nav>
                </header>



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