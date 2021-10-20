import React, { useState } from "react";
import Delete from "./delete.svg";
import firebase from "../util/firebase";

function Todo({ todo }){


    const [newTitle, setNewTitle] = useState("");

  const deleteTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };
  
  const handleChange = (e) => {
    //e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
    return(
      <li>
     
      <img src={Delete} className="x"  onClick={deleteTodo} />
      <p
        type="text"
        className="list"
        onChange={handleChange}
      >
        {todo.title === "" ? newTitle : todo.title}
      </p>
    </li>
    );
}

export default Todo;