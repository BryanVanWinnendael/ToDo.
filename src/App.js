import React,{useEffect,useState} from "react";
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import todo from "./todo.svg";

const Local_storage_key = "react-todo-list-todos";

function App() {

  return (
   
    <div className="App">
      <div className="card">
      <img src={todo}   style={{
          width:"60%",
          maxWidth:"400px"
        }}       
        />
        <h1>ToDo.</h1>
        <div className="box">
        <TodoForm />
        <TodoList/>
        </div>
      </div>
    </div>
  );
}

export default App;
