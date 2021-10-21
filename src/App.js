import React from "react";
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import todo from "./todo.svg";
import img1 from "./1.svg"



function App() {

  return (
   
    <div className="App">
      <div className="card">
      <img src={img1}  alt="banner" style={{
          width:"100%",
          maxHeight:"400px",
          marginLeft:"5px",
          marginRight:"5px"
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
