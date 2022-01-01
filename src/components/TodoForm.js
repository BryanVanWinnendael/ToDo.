import React, { useState } from "react";
import firebase from "../util/firebase";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {

    "& .MuiInputLabel-root": {
      color: "var(--text-color)"
    },
    
    "& .MuiInput-underline:before": {
      borderBottomColor: "var(--text-color)"
    },
    
    "& .MuiInput-input":{
      color:"var(--text-color)"
    },
    "& .MuiInput-root:hover:not(.Mui-disabled):before":{
      borderBottomColor: "var(--text-color)"
    }, 
    // calendar
    "& .MuiCalendarPicker-viewTransitionContainer":{
      color:"var(--text-color)"
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root":{
      color:"var(--text-color)",
      backgroundColor:"transparent"

    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root":{
      color:"var(--text-color)",
      backgroundColor:"transparent"
    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":{
      border: "1px solid var(--text-color)"
    },
    "& .css-l0iinn":{
      color:"var(--text-color)",
    },
    "& .css-fd2y78-MuiSvgIcon-root":{
      fill:"var(--text-color)",
    },
    "& .css-i4bv87-MuiSvgIcon-root":{
      fill:"var(--text-color)",
    },
    "& .css-1w13o7u-MuiTypography-root":{
      color:"var(--text-color)",
    }
   
   
  }
});

function TodoForm(){
  const [title, setTitle] = useState("");
  const [date, setDate] = React.useState(null);
  const classes = useStyles();
  

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker date={date} onChange={(newDate) =>setDate(newDate)} className={classes.root}/>
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
          className={classes.root}
          
        
          
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



export default TodoForm;