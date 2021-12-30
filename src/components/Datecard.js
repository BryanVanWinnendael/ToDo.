import React, { useState } from "react";

function Datecard({ todo }){


  const [newTitle] = useState("");
  const [newDate] = useState("");
  

    return(
      <div>
     
        {todo.date !== false && (
            <div className="carddate">

                <div style={{
                    height:"40%"
                }}> 
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