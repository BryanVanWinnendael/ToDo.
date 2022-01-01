import React, { useState, useEffect } from "react";
import Todo from "./Todo"
import firebase from "../util/firebase";

function TodoList(){

    const [todoList, setTodoList] = useState();
    const [check,setCheck]= useState(false);
    useEffect(() => {
        const todoRef = firebase.database().ref("Todo");
        todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
       
        const todoList = [];
        for (let id in todos) {
            todoList.push({ id, ...todos[id] });
        }
      
        if(todoList.length === 0){
            setCheck(true)
        }
        else{
            setCheck(false)
        }
        
        setTodoList(todoList);
     
        });
    }, []);

 
    return (
        <ul className="boxList">
          {todoList
            ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
            : ""}
        {check && (
            <div>
            <p style={{
                color:"var(--text-color)"
            }}>Your task list is empty </p>
           
            <u style={{
                color:"#1976d2",
                fontSize:"smaller",
                cursor:"pointer",
                
                
            }} onClick={() =>  document.getElementById("inputtask").focus()}>Add a new task to get started </u>
            </div>
        )}
        </ul >
      );
}


export default TodoList;