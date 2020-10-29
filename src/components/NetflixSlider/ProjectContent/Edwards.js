import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import image from '../../../assets/AI_Image2_2.jpg'
import Fade from 'react-reveal/Fade';
import Aux from '../Aux'
import './Centerpoint.css'
//import './video-react.css'
// import ParallaxProvider from 'react-scroll-parallax'
import  '../../../../node_modules/video-react/dist/video-react.css';
import { Parallax } from 'react-scroll-parallax';
import catheterImage from '../../../assets/catheter.jpg'
import stakeholderImage from '../../../assets/1x/Stakeholders-100.jpg'
import heartValve from '../../../assets/HeartValves3.jpg'
import Valvegif from '../../../assets/Valve.gif'


import TextLoop from "react-text-loop";
import YouTube from 'react-youtube';
import { Player } from 'video-react';


import tavrVideo from '../../../assets/edwards.mp4'



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

  /* const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }; */

  const classes = useStyles();
  return (
    
    <Aux>

      {/* <Parallax y={[-20,0]} tagOuter="figure"> */}

      <div className="titletxt" >
        <Fade bottom>
          <h1> Transcatheter Aortic Valve Replacement [TAVR] Alignment Module.</h1>
        </Fade>
      </div>



      <div className="loglinetxt" >
        <Fade bottom>

          <h1>

            <TextLoop mask={true} fade={true} className={"redtxt"}>
              <span>"Usability</span>
              <span>"Precision</span>
              {/* <span>TAVR</span> */}
            </TextLoop>{" "}
            <TextLoop delay={600} mask={true} fade={true}>
              <span>creates</span>
              <span>saves</span>
              {/* <span>Alignment</span> */}
            </TextLoop>{" "}
            <TextLoop delay={1200} mask={true} fade={true} className={"redtxt"}>
              <span>precision."</span>
              <span>lives."</span>
              {/* <span>Module.</span> */}
            </TextLoop>


          </h1>
        </Fade>
{/* 
        <div>
          <img class={'img'} src={heartValve} />

        </div>
 */}







      </div>



















      {/* 

      <div className="headingtxt" >
        <Fade bottom> 
          <h2> General Context.</h2>
        </Fade>
      </div> */}

      <div className={classes.root}>
        <Grid container
          direction="row"
          color='primary'
          justify="center"
          display="flex"
          >
   


          <Grid container item xs={8} spacing={2}>
            <Fade bottom>
              <Paper className={classes.paper}>

              <img src={heartValve} />  
           
              </Paper>


            </Fade>
          </Grid>

          <Grid container item xs={2} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>
              HEART VALVES ARE MEANT TO ACT AS DOORS TO CHAMBERS OF THE HEART THROUGH WHICH BLOOD IS PUMPED. THEREFORE, IF A HEART VALVE DOESN'T CLOSE OR OPEN PROPERLY, BLOOD FLOW IS OBSRTRUCTED AND THE PATIENT WILL NOT HAVE THE NECESSARY AMOUNT OF BLOOD FLOWING THROUGH THEIR BODY. THIS IS CALLED <mark> REGURGITATION OF THE BLOOD</mark>.

             
           
              </Paper>


            </Fade>
          </Grid>

          <Grid container item xs={4} spacing={5}>
            <Fade bottom>
              <Paper className={classes.paper}>
                <div>
                <img src={Valvegif} />
                </div>
                
            AORTIC VALVE STENOSIS OCCURS DUE TO OVER-CALCIFICATION OF THE AORTIC VALVE, WHICH MAKES PATIENTS' AORTIC VALVES EXTREMELY RIGID, WHICH KEEPS THE VALVE FROM OPENING FULLY.


            </Paper>


            </Fade>
          </Grid>



          <Grid container item xs={7} spacing={1}>
            <Fade bottom>
              <Paper className={classes.paper}>

                
            AS OPPOSED TO OPEN HEART SURGERY, WHICH CARRIES SIGNIFICANT RISK FOR THE PATIENT AS WELL AS LONG RECOVER TIMES, TRANSCATHETER AORTIC VALVE REPLACEMENT [TAVR], WHICH IS A MINIMALLY INVASIVE PROCEDURE, IS USED TO REPLACE THE DYSFUNCTIONAL HEART VALVE WITH A PROSTHETIC ONE. A SURGEON USES A CATHETER DELIVERY SYSTEM TO PLACE THE PROSTHETIC VALVE IN PLACE OF THE OLD ONE.
            <img className={"float-left"} src={catheterImage} />
           
            </Paper>


            </Fade>
          </Grid>
         
          <Grid container item xs={1}  >
            
            <Fade bottom>
              
              <Paper className={classes.paper}>
             
              <Player 
              playsInline
              fluid={false}
              
              
            
                 src={tavrVideo} />
      
            </Paper> 
          
           
            


            </Fade>
          </Grid>
       


         
                
           
            

         {/*  <Grid container item >
            <Fade bottom>
              <Paper className={classes.paper}>

                
              <Player
              autoPlay
            
                playsInline src={tavrVideo} />
            </Paper>


            </Fade>
          </Grid>

 */}
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