import React from 'react'
import './FaceRecognition.css'
 const FaceRecognition= ({imageUrl,box})=> {
    
        return (
            <div className ="center"> 
            <div className="absolute">       

            <img id="inputimage" style ={{ paddingTop:'15px', width:'500px', height:'auto'}}src ={imageUrl} alt ="loadedpicture"/> 

            <div className = 'bounding_box' style ={{top:box.topRow, left:box.leftCol, right:box.rightCol, bottom:box.bottomRow}} >
            </div>
                </div>
            </div>
        )
    }

export default FaceRecognition
