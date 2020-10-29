import React, {Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import image from '../../../assets/AI_Image2_2.jpg'
import Fade from 'react-reveal/Fade';
import Aux from '../Aux'
import './Centerpoint.css'




class Centerpoint2 extends Component {
  constructor() {
    super()

    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.parallaxShift);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.parallaxShift);
  } 
  
  parallaxShift = () => {
    this.setState({
      offset: window.pageYOffset
    });
  };

  render() {
    return (

      <Aux>

        <div style={{ bottom: this.state.offset / 2 }}>
        <div >
          <Fade bottom>
            <img class="center" src={image} />
          </Fade>
        </div>

        <div className="titletxt">
          <Fade bottom>
            <h1>"Imagine trying to assemble a bicycle while wearing ski gloves that are too large and are inflated like a balloon."" </h1>
          </Fade>
        </div>


        <div className="bodytxt">
          <Fade bottom>
            <h1>"Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng]velit, sed quia non-numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipitlaboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui inea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non-provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero" </h1>
          </Fade>
        </div>

        </div>

        




      </Aux>

    )
  }

}

export default Centerpoint2





