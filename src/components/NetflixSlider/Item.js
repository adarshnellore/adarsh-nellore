import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'
import HoverVideoPlayer from 'react-hover-video-player';



const Item = ({ movie }) => (
  
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      var well = {
        boxShadow: "1px 3px 1px #9E9E9E"
      }

      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          {/* <img src={movie.image} alt={movie.title} onClick={() => onSelectSlide(movie)}/> */}

          <HoverVideoPlayer
           // videoSrc='https://www.flickr.com/photos/189664396@N03/50273077922/play/720p/aa37109734'
           videoSrc={movie.image}
            pausedOverlay={
              <img src={movie.imageBg} onClick={() => onSelectSlide(movie)}  alt="" /> //turn box shadow blue once clicked
            }
           
            style={{
              width: '100%',
              // The container should have a set 16:9 aspect ratio
              // (https://css-tricks.com/aspect-ratio-boxes/)
              paddingTop: '80%',
              // boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              
               
            }}
            // The video and overlays should expand to fill the 16:9 container
            sizingMode="container"
          />
          {/* <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
           */}
          {/* {isActive && <Mark />} */}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;


