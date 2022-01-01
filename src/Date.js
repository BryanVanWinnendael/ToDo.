import React, { useState, useEffect } from "react";
import Datecard from './components/Datecard'
import firebase from "firebase";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
function Date() {

    const [todoList, setTodoList] = useState();
    const [calendarType, setCalendarType] = React.useState('week');
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
    const onChange = (date) => {
        console.log(date.toString());
      };

    return (
        <div style={{
            marginTop:"35px"
          }}>
             
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={(newDate) =>setDate(newDate)} />      
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
