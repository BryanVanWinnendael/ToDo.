import React from "react";
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";




function Home() {
  return (
   
   
      <div className="card">
      
        
       
        <div className="box">
          
            <TodoForm />
            <TodoList/>
     
        </div>
      </div>

  );
}

export default Home;
