import React, { Component } from 'react';
import './App.css'; 
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Signin from './components/Sign-in/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'


const particleOptions= {
  particles:{
  number:{
    value:300,
    density:{
      enable:true,
      value_area:800
    }
  }
}
}

const initialState ={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user:{
    id:'',
      name:'',
      email:"",
      entries:0,
      joined:'',
  }
}

class App extends Component{
    constructor() {
      super();
      this.state = initialState
    };

    loadUser = (data)=>{
      this.setState({user:{
        id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined: data.joined
          }
   })
    }

    calculateFaceLocation = (data)=>{
     const clarifiedFace = data.outputs[0].data.regions[0].region_info.bounding_box
     const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height= Number(image.height)
    
    return{
      leftCol:clarifiedFace.left_col*width,
      rightCol: width - (clarifiedFace.right_col*width),
      topRow: clarifiedFace.top_row*height,
      bottomRow: height - (clarifiedFace.bottom_row*height)
    }
  }
  
  
  displayFace =(box)=>{
    this.setState({
      box:box
    })
  }
    onInputChange = (event)=>{
    this.setState({input:event.target.value})
    }
    
    onSubmit = ()=>{
      this.setState({imageUrl:this.state.input})
     fetch('https://vast-anchorage-93089.herokuapp.com/imageUrl',{
       method:'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
         input:this.state.input
       })
     })
     .then(response =>response.json())
      .then (response => {
        if(response){
          fetch('https://vast-anchorage-93089.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
             body:JSON.stringify({
              id:this.state.user.id,
              entries:this.state.user.entries
    })
           })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log)
          
          
        }
        this.displayFace(this.calculateFaceLocation(response))
      }
      ).catch(err => console.log(err))
  ;      
      

    }

    onRouteChange =()=>{
      this.setState({
        isSignedIn:true
      })
      this.setState({
        route:'home'
      })
    }

    onSignOut =()=>{
      this.setState(initialState)
      this.setState({
        route:'signin'
      })
    }

    onRegister = ()=>{
      this.setState({
        route:'register'
      })
    }

    

    render(){
  return (
    <div className="App">
      <Particles className ='particles'
                params={particleOptions} />
      <Navigation onSignOut ={this.onSignOut} onRegister ={this.onRegister} isSignedIn ={this.state.isSignedIn}/>
      { this.state.route === 'home'
      ?<div>
      <Logo />
      <Rank name ={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
      
      <FaceRecognition box ={this.state.box} imageUrl = {this.state.imageUrl}/>
      </div>
      :(
        this.state.route === 'signin'?
        <Signin onRouteChange ={this.onRouteChange} onRegister ={this.onRegister} loadUser ={this.loadUser}/>
        : <Register onRouteChange ={this.onRouteChange} loadUser ={this.loadUser}/> 
      )
      
    }
    </div>
  );
    }
}

export default App;
