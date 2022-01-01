import React, { useState } from "react";
import firebase from "../util/firebase";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';



function TodoForm(){
  const [title, setTitle] = useState("");
  const [date, setDate] = React.useState(null);

  const handleChange = (e) => {
      setTitle(e.target.value);
    };
    
  const createTodo = (event) => {
      event.preventDefault();
      
      const todoRef = firebase.database().ref("Todo");
      var todo = {}
     
      if(date === null){
        todo = {
          title,
          complete: false,
          date: false
        };
      }
      else{
        todo = {
          title,
          complete: false,
          date:convertDate(date)
        };
      }
     
      todoRef.push(todo);
      setTitle("");   
      setDate(null)
    };
    
  function convertDate(dateString) {
      var date = new Date(dateString);
      return date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear();
  }

  return(
        <form onSubmit={createTodo} >
        
       
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={(newDate) =>setDate(newDate)} />
          </LocalizationProvider>
          {date && (
            <p style={{
              marginTop:"0",
              color:"#1976d2",
              fontWeight:"bold"
            }}>Date picked: {convertDate(date)} </p>
          )}
        
        </div>
      

        <div >
          <TextField id="standard-basic"  variant="standard" label="Add task"
          type="text"
          onChange={handleChange}  
          value={title} 
          name="task"
          required
          sx={{ label: { color: 'var(--text-color)' } }}
      
         
          
          />
          <Button variant="contained" type="submit" style={{
            margin:"10px",
          }} startIcon={
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                fill="currentColor"
              />
            </svg>

          }>
            Add
          </Button>
          </div>
       
        </form>
    );
}

export default TodoForm