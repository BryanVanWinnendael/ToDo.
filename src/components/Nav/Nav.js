import React from "react";
import homeimg from './img/home.svg';
import dateimg from './img/calender.svg';
import './style.css';
import {useActive} from './Active';


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:useActive.getActive() 
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


    render(){


    return (
        <nav id="navId">
    
            <ul>
                <li id="idHome" onClick={this.handleCheck.bind(this)}>
                    <div onClick={this.props.toggleProjects}>
                        <img src={homeimg}  className={this.state.active === "home" ? "active": ""} id="homeId" alt="home"/>
                    </div>
                </li>

                <li onClick={this.handleCheck.bind(this)}>
                    <div onClick={this.props.toggleProjects}>
                        <img src={dateimg}  className={this.state.active === "date" ? "active": ""}  id="dateId" alt="dates"/>
                    </div>
                </li>
        
            </ul>
        </nav>
       
    )
}

}

export default Nav
