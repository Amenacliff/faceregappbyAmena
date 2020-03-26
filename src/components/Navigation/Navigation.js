import React from 'react';

const Navigation= ({onSignOut, isSignedIn, onRegister}) => {
    if(isSignedIn){
        return(
 <nav style ={{display:'flex', justifyContent:'flex-end', paddingRight:'20px'}}>
  <p onClick ={onSignOut} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
 </nav>  )
    }
    else{
 return(
    <nav style ={{display:'flex', justifyContent:'flex-end', paddingRight:'20px'}}>
     <p onClick ={onSignOut} className='f3 link dim black underline pa3 pointer'>Signin</p>
     <p onClick ={onRegister} className='f3 link dim black underline pa3 pointer'>Register</p>
 </nav>   
        ); 
    }

}


export default Navigation