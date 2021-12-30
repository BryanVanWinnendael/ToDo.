import React from "react";
import './App.css';
import Home from "./Home"
import Nav from "./components/Nav/Nav";
import {useActive} from './components/Nav/Active';
import Date from "./Date";


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
  return (
    <div className="App">
        {currentView === 'home' && (<Home/>)}
        {currentView === 'date' && (<Date/>)}
        <Nav toggleProjects={this.toggleShowProjects}/>
    </div>
  );
}
}

