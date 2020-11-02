import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import image from '../../../assets/AI_Image2_2.jpg'
import Fade from 'react-reveal/Fade';
import Aux from '../Aux'
import './Centerpoint.css'
// import ParallaxProvider from 'react-scroll-parallax'
// import { Parallax } from 'react-scroll-parallax';
import introImage from '../../../assets/centerpointmaterials/sitting.jpg';
import centerpointMovie from '../../../assets/centerpointmaterials/centerpoint.mov'
import chairDiagram from '../../../assets/centerpointmaterials/chairdiagram2.jpg';
import centerpointWhole from '../../../assets/centerpointmaterials/centerpointwhole.jpg'
import { Player } from 'video-react'
import  '../../../../node_modules/video-react/dist/video-react.css';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: '#222222',
    // textAlign: 'left',
    // marginLeft: "2vw",
    // marginRight: "2vw",
    // marginTop: "20vh",
    wordSpacing: "1px",
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontFamily: 'Courier New',
    fontSize: 11,
    textShadow: 'none',
    resizeMode: 'contain',




    //*******reduce the padding for the entire page */    

  }
}));
export default function Edwards() {

 /*  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
 */
  const classes = useStyles();
  return (
    
    <Aux>

      {/* <Parallax y={[-20,0]} tagOuter="figure"> */}

      <div className={classes.root}>
        <Grid container
          direction="row"
          color='primary'
          justify="center"
          display="flex"
          >
   

      <Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <h1>
                The Centerpoint Experience
              </h1>

              <body>
                Installation prototype

              </body>
            
                Exploring a single optic phenomenon.

              </Paper>


            </Fade>
          </Grid>

        <Grid container item xs={5} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={introImage} />  
           
              </Paper>


            </Fade>
          </Grid>

      {/* <div className="titletxt" >
        <Fade bottom>
          <h1> THE CENTERPOINT EXPERIENCE.</h1>
        </Fade>
      </div> */}



    

{/* 
          <Grid container item xs={10} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={introImage} />  
           
              </Paper>


            </Fade>
          </Grid> */}


          <Grid container item xs={6} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={chairDiagram} />               
           
              </Paper>


            </Fade>
          </Grid>

          <Grid container item >
            <Fade bottom>
              <Paper className={classes.paper}>

                
              <Player
               playsInline
               fluid={false}
            
                 src={centerpointMovie} />
            </Paper>


            </Fade>
          </Grid>


        

          <Grid container item xs={10} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
                <div>
                <img src={centerpointWhole} />
                </div>
                


            </Paper>


            </Fade>
          </Grid>



          {/* <Grid container item xs={7} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

                
            AS OPPOSED TO OPEN HEART SURGERY, WHICH CARRIES SIGNIFICANT RISK FOR THE PATIENT AS WELL AS LONG RECOVER TIMES, TRANSCATHETER AORTIC VALVE REPLACEMENT [TAVR], WHICH IS A MINIMALLY INVASIVE PROCEDURE, IS USED TO REPLACE THE DYSFUNCTIONAL HEART VALVE WITH A PROSTHETIC ONE. A SURGEON USES A CATHETER DELIVERY SYSTEM TO PLACE THE PROSTHETIC VALVE IN PLACE OF THE OLD ONE.
            <img className={"float-left"} src={catheterImage} />
            </Paper>


            </Fade>
          </Grid> */}

          


          {/* <Grid container item xs={7} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

                
              <YouTube videoId="f20qrZcD1LE" opts={opts} onReady={this._onReady} />
            </Paper>


            </Fade>
          </Grid> */}











        </Grid>

      </div>
      {/* </Parallax> */}
    </Aux>
  );
}