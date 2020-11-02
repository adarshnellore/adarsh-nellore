import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import image from '../../../assets/AI_Image2_2.jpg'
import Fade from 'react-reveal/Fade';
import Aux from '../Aux'
import './Centerpoint.css'
// import ParallaxProvider from 'react-scroll-parallax'
import { Parallax } from 'react-scroll-parallax';
import resonanceImage from '../../../assets/Resonance.png'
import '../../../../node_modules/video-react/dist/video-react.css';
import './Spatial.css';


import { Player } from 'video-react';

import spatialVideo from '../../../assets/SpatialDemo.mov'

import spatialIntro from '../../../assets/spatialmaterials/spatialIntro.jpg'
import grandCentral from '../../../assets/spatialmaterials/grandcentral.mp4'
import '../../../../node_modules/video-react/dist/video-react.css';

import reverb from '../../../assets/spatialmaterials/reverb.jpg'
import reverb2 from '../../../assets/spatialmaterials/reverb2.png'

import roomModes from '../../../assets/spatialmaterials/roommodes.jpg'

import musicalChart from '../../../assets/spatialmaterials/musicalchart.jpg'

import Codepen from "react-codepen-embed";

import cube from '../../../assets/spatialmaterials/roommodecube.mov'

import NYvideo from '../../../assets/spatialmaterials/TitleVideo.mp4'

import YouTube from 'react-youtube';

import questionpic from '../../../assets/spatialmaterials/questions.png'

import tyler from '../../../assets/spatialmaterials/magicwand.mp3'

import ReactPlayer from 'react-player'

import tylergraph from '../../../assets/spatialmaterials/tyler.jpg'

import radiograph from '../../../assets/spatialmaterials/radiohead.jpg'

import pinknoise from '../../../assets/spatialmaterials/pinknoise.jpg'

import binaural from '../../../assets/spatialmaterials/Binaural.mp4'

import userjourney from '../../../assets/spatialmaterials/userjourney.jpg'







const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "justify",
    color: '#222222',
    // marginLeft: "2vw",
    // marginRight: "2vw",
    wordSpacing: "-1px",
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontFamily: 'Courier New',
    fontSize: 12,
    textShadow: 'none',
    resizeMode: 'contain',




    //*******reduce the padding for the entire page */    

  }
}));
export default function Spatial() {
  const classes = useStyles();
  return (
    <Aux>

      <div className="halfWidthContentLeft">
        <h1 className="musicTxt">
          Spatial Resonance Project: Research and Theory
              </h1>

        <body className="musicTxt">
          Can music producers make music by designing interior spaces?
          Can we translate interior architecture to music?
          How might neural networks facilitate musical experiences?
               </body>



      </div>
      <div>

        <img src={spatialIntro} className="halfWidthContentRight"></img>
      </div>


      <div>

        <iframe src="../../../../SpatialMusicPage1/MusicPage1.html" title="Spatial Music" className="musicApp"></iframe>

      </div>


      <div >
        <img src={reverb} className="halfWidthContentLeft" />
      </div>
      <div >
        <img src={reverb2} className="halfWidthContentRight" />
      </div>

      <div>

        <div className="OneFourthWidthContentLeft">
          <h6 className="musicTxt"> Reverberation exists within every interior space we frequent. Reverberation is persistence of sound after the sound is produced.
          Sound waves originate from an acoustic source and reflect off walls of interior spaces and are then absorbed by various objects within a room: air, furniture, people.
                  </h6>
        </div>

        <div className="OneFourthWidthContentRight">
          <h6 className="musicTxt">Interior spaces have fundamental resonances that depend on the inherent physical properties of the room, such as wall stiffness and room dimension.
              <mark>
              If the sound waves that are released from an acoustic source within the room have audio frequencies close to room resonances, the amplitude of the sound significantly increases.
              Room modes are the collection of room resonances.
              </mark></h6>

        </div>
      </div>

      <div>

        <img src={roomModes} ></img>
      </div>


      <div>
        <div className="halfWidthContentLeft">
          <h6 className="musicTxt"> We consider the three types of room modes: axial, tangential, and oblique.
          Axial modes, in which sound waves only bounce of parallel surfaces (such as floor and ceiling) are the strongest and most influential room modes.
          Tangential modes involve two sets of surfaces and possess half the strength of axial modes.
              Oblique modes involve three or more sets of surfaces and possess the least strength. </h6>
        </div>

        <div className="halfWidthContentRight">
          <h6 className="musicTxt">Interior spaces have fundamental resonances that depend on the inherent physical properties of the room, such as wall stiffness and room dimension.
              <mark>
              Key insight: interior resonant frequencies correspond to musical notes. Interior resonant frequencies range from 20 Hz to 200 Hz.
              Musical notes start from around 16 Hz.
              This means that interior spaces have inherent musical qualities.
              </mark></h6>

        </div>
      </div>



      <div>

        <div>
          <img src={musicalChart} className="halfWidthContentLeft" />
        </div>
        <div>
          <img src={questionpic} className="halfWidthContentRight" />
        </div>
        <div >

</div>
          <div>
            <Player
              playsInline


              src={cube} ></Player></div>
          </div>
    </Aux>
  );
}