import React, { Component } from 'react';
import Slider from '../../components/NetflixSlider/Slider';
import {movies} from './Projects.1';
import Item from '../../components/NetflixSlider/Item'
import SliderApp from '../../components/NetflixSlider/SliderApp'



export class Projects extends Component {
    render() {


        return (
            // <div className="app">
            //     <Slider>
            //         {movies.map(movie => (
            //             <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            //         ))}
            //     </Slider>
            // </div>

            <SliderApp></SliderApp>
        );
    }
}

export default Projects;



