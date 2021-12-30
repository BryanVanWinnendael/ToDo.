import React, { useState } from "react";
import Delete from "./delete.svg";
import firebase from "../util/firebase";

function Todo({ todo }){


  const [newTitle] = useState("");

  const deleteTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };
  

    return(
      <li>
     
      <img src={Delete} className="x"  onClick={deleteTodo} alt="delete" />
     
      <p
        type="text"
        className="list"
      >
        {todo.title === "" ? newTitle : todo.title}
      </p>
     
      
    </li>
    );
}

export default Todo;