import React, { useState, useEffect } from "react";
import Datecard from './components/Datecard'
import firebase from "firebase";

function Date() {

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
        <div style={{
            marginTop:"35px"
          }}>
             {todoList
            ? todoList.map((todo, index) => <Datecard todo={todo} key={index} />)
            : ""}
        </div>
    )
}

export default Date
