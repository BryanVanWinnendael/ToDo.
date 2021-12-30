import React from "react";
import homeimg from './img/home.png';
import dateimg from './img/date.png';
import dark from './img/dark.png';
import light from './img/light.png';
import './style.css';
import {useActive} from './Active';


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:useActive.getActive(),
          icon: dark 
        }
    }
    

      

    handleCheck(e) {
        if(e.target.id === "homeId") {
            useActive.setActive("home")
            this.setState(prevState => ({
                active:useActive.getActive() 
            }))

        }

        else{
            useActive.setActive("date")
            this.setState(prevState => ({
                active:useActive.getActive() 
            }))
        }
       
    }

    changeicon(e){
        console.log("change")
       if(this.state.icon === dark) {
           this.setState({icon:light})
       }
       else{
        this.setState({icon:dark})
       }
    }

  
    render(){
      

    return (
        <nav id="navId">
    
            <ul>
                <li id="idHome" >
                    <div onClick={this.handleCheck.bind(this)} style={{
                        cursor:"pointer"
                    }}>
                        <img src={homeimg} onClick={this.props.toggleProjects} className={this.state.active === "home" ? "active": ""} id="homeId" alt="home"/>
                    </div>
                </li>

                <li>
                    <div class="iconmode" onClick={this.changeicon.bind(this)}>
                        <img src={this.state.icon} id="iconmode" alt="mode"/> 
                    </div>
                </li>
               

                <li >
                    <div onClick={this.handleCheck.bind(this)} style={{
                        cursor:"pointer"
                    }}>
                        <img src={dateimg} onClick={this.props.toggleProjects}  className={this.state.active === "date" ? "active": ""}  id="dateId" alt="dates"/>
                    </div>
                </li>
        
            </ul>
        </nav>
       
    )
}

}

export default Nav
