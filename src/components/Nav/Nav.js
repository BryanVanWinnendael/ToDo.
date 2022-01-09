import React from "react";
import {useActive} from './Active';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          navvalue:'home',
          fillhome: useActive.getActive() !== "home" ? "var(--text-color)" : "",
          filladd: useActive.getActive() !== "add" ? "var(--text-color)" : "",
          fillprofile: useActive.getActive() !== "profile" ? "var(--text-color)" : "",


        }
    }
    

      

    handleChange(event,newVal){
        useActive.setActive(newVal)
        this.props.toggleProjects()
        this.setState({navvalue:newVal})

        this.setState({fillhome: useActive.getActive() !== "home" ? "var(--text-color)" : ""})
        this.setState({filladd: useActive.getActive() !== "add" ? "var(--text-color)" : ""})
        this.setState({fillprofile: useActive.getActive() !== "profile" ? "var(--text-color)" : ""})
       
    }


  
    render(){
      

    return (

        <BottomNavigation sx={{ width: "100%" }} value={this.state.navvalue} onChange={this.handleChange.bind(this)} style={{
            backgroundColor:"var(--bg-color)",
            position:"fixed",
            bottom:"0",
            boxShadow:"2px 2px 7px 01px rgba(0, 0, 0, 0.8)"
        }}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon style={{
            fill: this.state.fillhome
        }}/>}
        />
      
        <BottomNavigationAction 
        label="Add" 
        value="add" 
        icon={<AddBoxIcon style={{
            fill: this.state.filladd
        }} />} />

        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon style={{
              fill: this.state.fillprofile
          }}/>}
        />
      </BottomNavigation>

       
    )
}

}

export default Nav
