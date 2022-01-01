import React, { useState } from "react";
import dateicon from "./Nav/img/date.png"
function Datecard({ todo }){


  const [newTitle] = useState("");
  const [newDate] = useState("");


    return(
      <div>
     
        {todo.date !== false && (
            <div className="carddate">
            <div style={{
                 height:"40%",
                 display:"flex",
                 alignItems:"center",
                 margin:"10px"
            }}> 
            <img src={dateicon}  className="dateicon" id="dateId" alt="dates"/>
            <p type="text" className="textdate">
                {todo.date === false ? newDate : todo.date}
            </p>
            </div>

            <div>
            <p type="text" className="titledate">
                {todo.title === "" ? newTitle : todo.title}
            </p>
            </div>
          
        </div>
               
        )}
         
     
    </div>
    );
}

export default Datecard;