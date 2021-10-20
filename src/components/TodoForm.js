import React, { useState } from "react";
import firebase from "../util/firebase";

function TodoForm(){
    const [title, setTitle] = useState("");

    const handleChange = (e) => {
      setTitle(e.target.value);
    };
    const createTodo = (event) => {
      event.preventDefault();
      const todoRef = firebase.database().ref("Todo");
   
      const todo = {
        title,
        complete: false,
      };
      todoRef.push(todo);
      // otherRef.push(other);
      setTitle("");
    };

    return(
        <form onSubmit={createTodo}>
            <input 
            name="task"
            type="text"
            value={title}
            required
            onChange={handleChange}
            />
           <button type="submit" >Submit</button>
        </form>
    );
}

export default TodoForm