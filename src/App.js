import React from "react";
import './App.css';
import Home from "./Home"
import Nav from "./components/Nav/Nav";
import {useActive} from './components/Nav/Active';
import Date from "./Date";
import Header from "./components/Header";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentView:useActive.getActive(),
       
    }
 
}

  toggleShowProjects = () => {
    this.setState(prevState => ({
        currentView: useActive.getActive()
    }))
}

  

render(){
  const { currentView } = this.state;
  console.log(localStorage.getItem("theme"))
  if(localStorage.getItem("theme") === null){
    localStorage.setItem("theme","lightmode")
  }

  if(localStorage.getItem("theme") === "darkmode") {
    document.body.classList.add("dark-theme")
  }

  if(localStorage.getItem("theme") === "lightmode") {
    document.body.classList.remove("dark-theme")
  }

  return (
    <div className="App">
        <Header/>
        {currentView === 'home' && (<Home/>)}
        {currentView === 'date' && (<Date/>)}
        <Nav toggleProjects={this.toggleShowProjects}/>
    </div>
  );
}
}

