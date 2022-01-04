import React, { useState, useEffect } from "react";
import Datecard from './components/Datecard'
import firebase from "firebase";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";
import Delete from "./components/delete.svg";
const useStyles = makeStyles({
    root: {
      // calendar
      "& .css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":{
        border: "1px solid var(--text-color)"
      },
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
      "& button .css-wed0tz:not(.Mui-selected)":{
        border:"1px solid var(--text-color)"
      }
     
     
    }
  });

function Datepage() {
    const classes = useStyles();
    const [todoList, setTodoList] = useState();
    const [date, setDate] = React.useState(null);
    const [check,setCheck]= useState(false);

    useEffect(() => {
      const todoRef = firebase.database().ref("Todo");
      todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
     
      const todoList = [];
      for (let id in todos) {
          todoList.push({ id, ...todos[id] });
      }
      if(todoList.length === 0){
          setCheck(true)
      }
      else{
          setCheck(false)
      }

      setTodoList(todoList);
    
      
      });
     

  }, []);

  

    

  

    function convertDate(dateString) {
        var date2 = new Date(dateString);
        return date2.getDate()+"/"+(date2.getMonth() + 1)+"/"+date2.getFullYear();
    }

    function filter(dategiven){
        setDate(dategiven)
        resetFilter()
        const box = document.getElementsByClassName("carddate")
        for(var i of box){
           if(i.getElementsByClassName("textdate")[0].innerHTML !== convertDate(dategiven)){
               i.style.display = "none"
           }
        }
   
    }

    function resetFilter(){
        const box = document.getElementsByClassName("carddate")
        for(var i of box){
           
            i.style.display = "block"
           
        }
    }

    function deleteDate(){
        resetFilter()
        setDate(null)
    }

  

    return (
        <div style={{
            marginTop:"35px"
          }}>
             
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={(newDate) =>filter(newDate)} className={classes.root}/>      
            </LocalizationProvider>
           
            <div id="todobox" style={{
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginBottom:"100px"

            }}>
            {date && (
              <div style={{
                display:"flex",
                alignItems:"center",
                marginBottom:"20px"
                
              }}> 
              <img src={Delete} className="x"  onClick={deleteDate} alt="delete" style={{
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
 
         
            {todoList ? todoList.map((todo, index) => 
              <Datecard todo={todo} key={index} className="test"/>
            ): ""}
       
            {check && (
            <div>
            <p style={{
                color:"var(--text-color)"
            }}>Your task list is looking empty... </p>
          
            </div>
            )}      
            </div>
 
        </div>
    )
}

export default Datepage
