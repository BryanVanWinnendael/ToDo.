import React, { useState, useEffect } from "react";
import Todo from "./Todo"
import firebase from "../util/firebase";

function TodoList(){

    const [todoList, setTodoList] = useState();
  
    useEffect(() => {
        const todoRef = firebase.database().ref("Todo");
        todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
       
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id] });
        }
        
        setTodoList(todoList);
     
        });
    }, []);
    return (
        <ul className="boxList">
          {todoList
            ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
            : ""}
        </ul >
      );
}


export default TodoList;