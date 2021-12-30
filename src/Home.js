import React from "react";
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";




function Home() {
  return (
   
   
      <div className="card" style={{
        marginTop:"35px"
      }}>
      
        
       
        <div className="box">
          
            <TodoForm />
            <TodoList/>
     
        </div>
      </div>

  );
}

export default Home;
