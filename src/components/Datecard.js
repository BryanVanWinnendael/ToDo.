import React, { useState } from "react";

function Datecard({ todo }){


  const [newTitle] = useState("");
  const [newDate] = useState("");
  

    return(
      <div>
     
        {todo.date !== false && (
            <div className="carddate">
                <p type="text">
                    {todo.date === false ? newDate : todo.date}
                </p>
                <p type="text">
                    {todo.title === "" ? newTitle : todo.title}
                </p>
            </div>
          
        )}
     
     
    </div>
    );
}

export default Datecard;