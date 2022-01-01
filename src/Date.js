import React, { useState, useEffect } from "react";
import Datecard from './components/Datecard'
import firebase from "firebase";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    root: {
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

function Date() {
    const classes = useStyles();
    const [todoList, setTodoList] = useState();
    const [date, setDate] = React.useState(null);

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
             
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={(newDate) =>setDate(newDate)} className={classes.root}/>      
            </LocalizationProvider>
            <div style={{
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginBottom:"100px"

            }}>
            {todoList
            ? todoList.map((todo, index) => <Datecard todo={todo} key={index} />)
            : ""}
            </div>
 
        </div>
    )
}

export default Date
