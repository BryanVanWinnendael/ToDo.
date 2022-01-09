import {useState,useEffect} from "react";

import './App.css';
import Home from "./Home"
import Nav from "./components/Nav/Nav";
import {useActive} from './components/Nav/Active';
import Add from "./Add";
import Header from "./components/Header";
import Profile from "./Profile"
import useNetworkStatus from "./components/useNetworkStatus";





function App() {
  const [currentView ,setCurrentView ] = useState(useActive.getActive())
  const status = useNetworkStatus()

  const toggleShowProjects = () => {
    setCurrentView(useActive.getActive())
  }

  useEffect(() =>{
    if(localStorage.getItem("theme") === null){
      localStorage.setItem("theme","lightmode")
    }
  
    if(localStorage.getItem("theme") === "darkmode") {
      document.body.classList.add("dark-theme")
    }
  
    if(localStorage.getItem("theme") === "lightmode") {
      document.body.classList.remove("dark-theme")
    }
  

  },[])

  return (
     <div className="App">
       
       <Header/>
        {currentView === 'home' && (<Home/>)}
        {currentView === 'add' && (<Add/>)}
        {currentView === 'profile' && (<Profile/>)}
        <Nav toggleProjects={toggleShowProjects}/>
        
        {!status && (
          <div style={{
            position:"fixed",
            top:"0",
            zIndex:"1000",
            width:"100%",
            height:"auto",
            backgroundColor:"#1976d2",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
           
        
           
          }}
          className="noInternet"
          > 
            <p style={{
              color:"white",
              fontWeight:"bold"
            }}>Please connect to the internet!</p>

          </div>
        )}
 
       
    </div>
  )
}

export default App
