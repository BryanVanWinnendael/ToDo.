import React, { useState } from "react";
import firebase from "../util/firebase";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Delete from "./delete.svg";
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';

// const theme = createTheme({
//   components: {
//     // Name of the component
//     CalendarPicker: {
//       styleOverrides: {
//         // Name of the slot
//         "&css-bkrceb-MuiButtonBase-root-MuiPickersDay-root": {
//           // Some CSS
//           fontSize: '10rem',
//         },
//       },
//     },
//   },
// });

// const ListItem = styled('li')(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

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
   
    "& .css-l0iinn":{
      color:"var(--text-color)",
    },
    "& svg":{
      fill:"var(--text-color)",
    },
    "& button":{
      backgroundColor:"transparent",
      color:"var(--text-color)",
      
    },
    "& span":{
      color:"var(--text-color)",
    },
    "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":{
      border:"1px solid var(--text-color) !important"
    }

   
   
  }
});

function TodoForm(){
  const [title, setTitle] = useState("");
  // const [removedate, setRemovedate] = useState(false);

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

  function deletedate(){
    setDate(null)
  }

  function setNewDate(dateGiven){
      if(dateGiven === date){
        setDate(null)
      }
      else{
        setDate(dateGiven)
      }
    }
  
   
  
  
  return(
        <form onSubmit={createTodo} >
        
       
        <div>
       
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* <ThemeProvider theme={theme}> */}
                <CalendarPicker  date={date} onChange={(newDate) =>setNewDate(newDate)}  className={classes.root}/>
          {/* </ThemeProvider> */}

          </LocalizationProvider>
          {date && (
            <div style={{
              display:"flex",
              alignItems:"center",
              marginBottom:"20px"
              
            }}> 
            <img src={Delete} className="x"  onClick={deletedate} alt="delete" style={{
              width:"20px",
           
            }}/>
            <p style={{
              marginTop:"0",
              color:"#1976d2",
              fontWeight:"bold",
              margin:"0"
            }}>Date picked: {convertDate(date)} </p>
            </div>
          )}
        
        </div>
      

        <div style={{
          display:"flex",
          flexDirection:"column",
         
        }}>
          <TextField id="inputtask"  variant="standard" label="Add task"
          type="text"
          onChange={handleChange}  
          value={title} 
          name="task"
          required
          className={classes.root}
          
        
          
          />
          <Button variant="contained" type="submit" style={{
            marginTop:"10px",
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