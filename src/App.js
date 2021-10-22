import React from "react";
import './App.css';
import Home from "./Home"
import Work from "./Work"

import {Route} from 'react-router-dom'



function App() {
  return (
   
    <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/work" component={Work} />
    </div>
  );
}

export default App;
