import React from "react";
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import todo from "./todo.svg";



function App() {

  return (
   
    <div className="App">
      <div className="card">
      <img src={todo}  alt="banner" style={{
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
