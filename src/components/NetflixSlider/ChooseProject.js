import React from 'react';
import Centerpoint from './ProjectContent/Centerpoint'
import Rocket from './ProjectContent/Rocket'
import Edwards from './ProjectContent/Edwards'
import Spatial from './ProjectContent/Spatial'

const ChooseProject = ({movie}) => {
  // alert({JSON.stringify(movie)});

  let chosencontent="";

  switch(movie.title.replace("Project-Photo-", '')) { //movie.id == ??
    case 'Centerpoint':
        chosencontent =<Centerpoint></Centerpoint>;      
        break;
    case 'Rocket':
      chosencontent =<Rocket></Rocket>
      break;
    case 'Edwards':
      chosencontent =<Edwards></Edwards>
      break;
    case 'Spatial':
      chosencontent =<Spatial></Spatial>
      break;

      
  }

 
  
  return(

    

    <div>        
    {chosencontent}
    </div>
    
    // <AutoLayout></AutoLayout>

    
  )

    
    
   

    

    

}

export default ChooseProject;