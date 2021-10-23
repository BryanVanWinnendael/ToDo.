import React from "react";
import {Link} from "react-router-dom";


function Nav(){
    let navs = false;

    const clickFunction = () => {

        var para = document.getElementById("toggle-icon");
        para.classList.toggle("rotate-icon");
        var nav = document.getElementById("navc");
        if(!navs){
          
            nav.style.animation = " show 0.5s "
            nav.style.display = "flex";
            navs = true;
            nav.style.left = "0px"
           
        }
        else{
            nav.style.animation = " close 0.6s "
            nav.style.left = "-100%"
            setTimeout(function(){ nav.style.display = "none";}, 600);
            navs = false;
        }

    }

    return(
      <nav>
       <div id="toggle-icon" onClick={clickFunction}>
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    <ul class="mainMenu" id="navc">
        <div className="space">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/work" >WORK</Link></li>
        </div>
    </ul>
    </nav>
    );
}

export default Nav;