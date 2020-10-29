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
import  '../../../../node_modules/video-react/dist/video-react.css';

import { Player } from 'video-react';

import spatialVideo from '../../../assets/SpatialDemo.mov'

import spatialIntro from '../../../assets/spatialmaterials/spatialIntro.jpg'
import grandCentral from '../../../assets/spatialmaterials/grandcentral.mp4'
import  '../../../../node_modules/video-react/dist/video-react.css';

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


  
{/* 
<div className="titletxt" >
        <Fade bottom>
          <h1> Spatial Resonance Form Demo Application.</h1>
        </Fade>
      </div> */}






    <div className={classes.root}>
      <Grid container   
          direction="row"
          color='primary'
          justify="center"
          display="flex"
           spacing={2}>
      {/* <Grid container item xs={2} spacing={6}>
        <Fade bottom>
          <Paper className={classes.paper} style={{boxShadow: 2}}><img src={image} resizeMode='contain' width="1000" height="600" /></Paper>
        </Fade>
        </Grid> */}
        
        {/* <Grid container item xs={3} spacing={1}> */}
        {/* <Fade bottom> */}
          {/* <Paper className={classes.paper}> */}

        
          {/* <Player */}
              {/* autoPlay */}
            
                {/* playsInline src={spatialVideo} /> */}
               
          {/* </Paper> */}
          {/* </Fade> */}
        {/* </Grid> */}

        <Grid container item xs={4} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <h1>
                Spatial Resonance Project: Research and Theory
              </h1>

        
          
               <body>
               Can music producers make music by designing interior spaces?
               Can we translate interior architecture to music?
               How might neural networks facilitate musical experiences?
               </body>

               
                https://codepen.io/adarshnell/full/PoPxoKo   

              </Paper>


            </Fade>
          </Grid>

        <Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={spatialIntro} />  
           
              </Paper>


            </Fade>
          </Grid>



          <Grid container item xs={30} spacing={10}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <Codepen hash="PoPxoKo" user="adarshnell" />
 
           
              </Paper>


            </Fade>
          </Grid>

         
{/* 
          <Grid container item xs={3} spacing={1}>
            <Fade bottom>
            

                
              <Player
                playsInline
                fluid={false}

                 src={grandCentral} />
          


            </Fade>
          </Grid> */}

<Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={reverb} />  
           
              </Paper>


            </Fade>
          </Grid>

          <Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={reverb2} />  
           
              </Paper>


            </Fade>
          </Grid>

          <Grid container item xs={4} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
                  Reverberation exists within every interior space we frequent. Reverberation is persistence of sound after the sound is produced.
                  Sound waves originate from an acoustic source and reflect off walls of interior spaces and are then absorbed by various objects within a room: air, furniture, people.
                  
                  
                  
            </Paper>


            </Fade>
          </Grid>


          <Grid container item xs={4} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
              Interior spaces have fundamental resonances that depend on the inherent physical properties of the room, such as wall stiffness and room dimension.
              <mark>
               If the sound waves that are released from an acoustic source within the room have audio frequencies close to room resonances, the amplitude of the sound significantly increases.
              Room modes are the collection of room resonances. 
              </mark>
   
            </Paper>

            </Fade>
          </Grid>


          <Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={roomModes} />  
           
              </Paper>


            </Fade>
          </Grid>


          <Grid container item xs={4} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
              We consider the three types of room modes: axial, tangential, and oblique. 
              Axial modes, in which sound waves only bounce of parallel surfaces (such as floor and ceiling) are the strongest and most influential room modes. 
              Tangential modes involve two sets of surfaces and possess half the strength of axial modes.
              Oblique modes involve three or more sets of surfaces and possess the least strength.

            </Paper>

            </Fade>
          </Grid>

          
          <Grid container item xs={4} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
             Key insight: interior resonant frequencies correspond to musical notes. Interior resonant frequencies range from 20 Hz to 200 Hz. 
             Musical notes start from around 16 Hz.
             This means that interior spaces have inherent musical qualities.

             <Player
                playsInline
                fluid={false}

                 src={cube} />

            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={6} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={musicalChart} />  
           
              </Paper>


            </Fade>
          </Grid>




        

          <Grid container item xs={6} spacing={4}>
            <Fade bottom>
              <Paper className={classes.paper}>
            

              <img src={questionpic} />  

            </Paper>

            </Fade>
          </Grid>






          <Grid container item xs={2} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
            
              Studies show that when we listen to music, we often experience time dilation, which is when we perceive the passage of time as slower or faster than it actually is [1]. 
              Studies also show that listening to music influences our perception of physical space even experiencing our surroundings as "choreographed." [1]
                
            </Paper>

            </Fade>
          </Grid>


          <Grid container item xs={0} spacing={0}>
            <Fade bottom>
              <Paper className={classes.paper}>
            

              <Player
                playsInline
                fluid={false}

                 src={NYvideo} />
          
            </Paper>

            </Fade>
          </Grid>


          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>
           
              Music producers often use spatial qualities of interior spaces in music so as to invoke memories and conditioning of those spaces within listeners. 
              These qualities include attributes of interior spaces such as reverberation but also what I call 'natural spatial arrangement.'

              Natural soundscapes are often imbued with '1/f' noise, which is pink noise. Humans often find pink noise, which is denser at lower frequency distributions and generated by natural occurrences such as ocean waves, to be relaxing and comforting. 

            </Paper>

            </Fade>
          </Grid>


          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>
           
              <YouTube videoId="zDk8pVOtiVY"  />

            </Paper>

            </Fade>
          </Grid>





          






          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>
              <h3>
              <mark>Hypothesis of natural spatial arrangement: </mark> The closer a song's frequency distribution is to that of 1/f noise, the more the song will invoke feelings of being in a larger physical space. 
              Let's test this theory out.
              </h3>
            </Paper>

            </Fade>
          </Grid>


          <Grid container item xs={10} spacing={5}>
            <Fade bottom>
              <Paper className={classes.paper}>



              <mark>Experiment:</mark> Between the songs "New Magic Wand" by Tyler the Creator and "Everything in Its Right Place" by Radiohead, I felt that the latter had a much more 'spatial' arrangement - using 
              more elements that are reminiscent of larger spaces such as reverberation and ambient sound.
              In order to test this theory, I analyzed the frequency distribution of both songs and compared them to the frequency distribution of 1/f noise. 
              The frequency distribution for "Everything in Its Right Place" was more similar to that of 1/f noise as much of the frequency information for this song was at lower frequencies just like the 1/f frequnecy distribution. 
              Therefore, my hypothesis of natural spatial arrangement was proven to be correct. 

              

            </Paper>

            </Fade>
          </Grid>

          



          <Grid container item xs={4} spacing={30}>
            <Fade bottom>
              <Paper className={classes.paper}>
              <ReactPlayer url='https://soundcloud.com/adarsh-nellore/pink-noise' />
              <img src={pinknoise} />  
            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={4} spacing={30}>
            <Fade bottom>
              <Paper className={classes.paper}>
              <ReactPlayer url='https://soundcloud.com/adarsh-nellore/new-magic-wand' />
              <img src={tylergraph} />  
            </Paper>

            </Fade>
          </Grid>


      


          <Grid container item xs={4} spacing={30}>
            <Fade bottom>
              <Paper className={classes.paper}>
              <ReactPlayer url='https://soundcloud.com/adarsh-nellore/everything-in-its-right-place-radiohead' />
              <img src={radiograph} />  
            </Paper>

            </Fade>
          </Grid>



          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>

              Binaural panning is another spatial technique often used within music that emulates human hearing of physical space by llowing you to position the direction of a signal source so your ears perceive the sound as coming from either in front, behind, above, below, and to the left or right of the listening position when using a stereo output.

            </Paper>



            </Fade>
          </Grid>

          <Grid container item >
            <Fade bottom>
              <Paper className={classes.paper}>

              <Player
                playsInline
                fluid={false}

                 src={binaural} />
                

            </Paper>
            Courtesy of Lorenzo Picinalli, Imperial College London.



            </Fade>
          </Grid>


          <Grid container item xs={3} spacing={30}>
            <Fade bottom>
              <Paper className={classes.paper}>


            <mark>Can music producers make music by designing interior spaces?</mark> 
            To this end, I created a prototype web application of this spatial production tool. 
          

            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={3} spacing={0}>
            <Fade bottom>
              <Paper className={classes.paper}>


            1) The user firsts changes the dimension of a simple geometric volume (cube) by click and dragging the cube.
          

            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={3} spacing={0}>
            <Fade bottom>
              <Paper className={classes.paper}>

            2) Based on the dimensions of the cube, the room modes are calculated.

            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={3} spacing={0}>
            <Fade bottom>
              <Paper className={classes.paper}>

            3) When the user presses play, resonant frequencies within the cube are fed into a neural network that corresponds them to musical notes. The music will then play.
          
            </Paper>

            </Fade>
          </Grid>

          <Grid container item xs={3} spacing={0}>
            <Fade bottom>
              <Paper className={classes.paper}>

            4) To experience the space the user has just designed, they must navigate to a new window. There, they experience the space they have created as a noise source among other noise sources.
                Binaural panning and reverberation, which is high if the room designed was large and low if the room designed was small, are also applied within this window.

            </Paper>

            </Fade>
          </Grid>




          <Grid container item xs={7} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>
              <img src={userjourney} />  
            </Paper>

            </Fade>
          </Grid>


         



          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>


              <Player playsInline  fluid={false} src={spatialVideo} /> 
            </Paper>

            </Fade>
          </Grid>




          <Grid container item xs={4} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>


          Other Questions: 

            Could enhancing the inherent musical qualities of interior spaces influence our experience of their physical qualities?
            Could we create comforting atmospheres facilitated through natural soundscapes using the physical properties of interior spaces?
            

            </Paper>

            </Fade>
          </Grid>





     


         
          
          

       
        
      </Grid>
      
    </div>
  
    </Aux>
  );
}