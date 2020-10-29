import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from './carousel'
import Dots from './indicator-dots'
import Buttons from './buttons'
import axios from 'axios';
import NotFound from './NotFound'

// Main App
class ProjectDetailsApp extends React.Component {





  constructor(props) {
    super(props)
    this.state = {
      axis: 'x',
      submovies: [{}]
    }
    this.setAxis = axis => {
      return () => this.setState({ 'axis': axis })
    }
    console.log(" Selected movie " + props.selectedMovie);
  }



  componentDidUpdate() {
    let searchtext = this.props.selectedMovie.title;
    //alert("Comonent updated" +searchtext);
    searchtext = searchtext.replace("Project-", "");


    const apiKey = '28c3d5434f6a9aecf0dc3871bdd8ce7c';
    const baseurl = 'https://api.flickr.com/services/rest/';
    const methodname = 'flickr.photos.search';
    const userid = '189664396@N03';
    const myurl = baseurl + '?method=' + methodname + '&user_id=' + userid + '&api_key=' + apiKey + '&text=-Project&text=' + searchtext + '&size=q&format=json&nojsoncallback=1';
    console.log("Searchtext =" + searchtext + " URL =" + myurl);

    axios.get(myurl)

      .then(response => {
        //Response object executed once results are obtained from Flickr

        let myphotos = response.data.photos.photo;

        var subStateArray = [];
        myphotos.filter(function (img) {
          if (img.title.includes("Project-")) {
            return false; // skip
          }
          return true;
        }).map(photo => subStateArray.push({
          id: photo.id,
          image: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg',
          imageBg: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg',
          title: photo.title
        })
        );

        console.log(subStateArray);

        this.setState({
          submovies: subStateArray
        })

      })
      .catch(error => {
        console.log('Yuo piece of shit. Error fetching and parsing data', error)
      })



  }




  render() {

    let subimages;

    console.log(" THIS STATE MOVIES = " + this.state.submovies);

    if (this.state.submovies.length > 0) {
      console.log( "Results returned " + this.state.submovies.length + " images.");



      subimages = this.state.submovies.map(mov => 
        //<div id={mov.id}><img src={mov.image}></img></div>

        //<div style={{backgroundColor: 'royalblue', height: '100%', width: '100%'}}><img src={mov.image} /></div>
        <img src={mov.image}/>

      );

      console.log ("SUB IMGES = " + subimages)
    }
    else {// Conditional Rendering - if No Results are returned render NotFound component
      console.log("This is part of the ELSE condition. Results has a length of " + this.state.submovies.map.length.length);
      subimages = <NotFound />
    }

    return (

      <div style={{ height: '100%',width:'100%',backgroundColor: 'yellow' }}>
        <header>
          <span className={this.state.axis === 'x' ? 'axis current' : 'axis'}
            onClick={this.setAxis('x')}>horizontal</span>
          <span className={this.state.axis === 'y' ? 'axis current' : 'axis'}
            onClick={this.setAxis('y')}>vertical</span>
        </header>
        <Carousel loop auto axis={this.state.axis} widgets={[Dots, Buttons]} className="custom-class">
          {subimages}
        </Carousel>


        {/* <Carousel loop auto axis={this.state.axis} widgets={[Dots, Buttons]} className="custom-class">
          <p style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</p>
          <p style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</p>
          <p style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</p>
        </Carousel> */}
      </div>
    )
  }
}

// ReactDOM.render(<App />, document.getElementById('root'))
export default ProjectDetailsApp;
