import React from "react";
import homeimg from './img/home.png';
import dateimg from './img/date.png';
import darkmode from './img/dark.png';
import lightmode from './img/light.png';
import './style.css';
import {useActive} from './Active';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:useActive.getActive(),
          icon:  localStorage.getItem("theme") === "lightmode" ? darkmode: lightmode,
          navvalue:'home'
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
    // darkmode
    // changeicon(e){
     
    //    if(localStorage.getItem("theme") == null ||localStorage.getItem("theme") === "lightmode") {
    //         document.body.classList.add("dark-theme")
    //         localStorage.setItem("theme","darkmode")
    //        this.setState({icon:lightmode})
    //    }
    //    else{
    //     document.body.classList.remove("dark-theme")
    //     localStorage.setItem("theme","lightmode")
    //     this.setState({icon:darkmode})
    //    }
    // }

    handleChange(event,newVal){
        useActive.setActive(newVal)
        this.props.toggleProjects()
        this.setState({navvalue:newVal})
       
    }


  
    render(){
      

    return (

        <BottomNavigation sx={{ width: "100%" }} value={this.state.navvalue} onChange={this.handleChange.bind(this)} style={{
            backgroundColor:"var(--bg-color)",
            position:"fixed",
            bottom:"0"
        }}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon  />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction 
        label="Calendar" 
        value="date" 
        icon={<CalendarTodayIcon />} />
      </BottomNavigation>

       
    )
}

}

export default Nav
