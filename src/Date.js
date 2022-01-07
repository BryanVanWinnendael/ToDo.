import React, { useState, useEffect } from "react";
import Datecard from './components/Datecard'
import firebase from "firebase";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";
import Delete from "./components/delete.svg";
import {useCategory} from "./components/Category";
import Alert from '@mui/material/Alert';
import {
 
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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
     
     
    },
    cards:{
      "& .swipeable-list-item__trailing-actions":{
        display:"flex",
        alignItems:"center",
        
      }
    }
  });

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
      
      color:
        "var(--text-color)",
  
      
      
    };
  }


  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
    width:"auto",
  
  
  })); 
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
 PaperProps: {
   style: {
     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
     width: 250,
     backgroundColor:"var(--bg-color)",
   },
 },
};

var names = []


export async function setNames(){
  var arrayres = []
  var res = await useCategory.getCategories()
  const arr =  res.docs.map(doc => doc.data());
  for(var i of arr){
    arrayres.push(i.name)
  }
  names = arrayres
}
setNames()


function Datepage() {
    const classes = useStyles();
    const [todoList, setTodoList] = useState();
    const [deletedTodo, setDeletedTodo] = useState(false);

    const [date, setDate] = React.useState(null);
    const [check,setCheck]= useState(false);
    const [ifcategories,setIfcategories]= useState(false);

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [chipData, setChipData] = React.useState([]);


    
    const trailingActions = (todo) => (
      <TrailingActions
      sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}
      >
        <SwipeAction
          sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
          }}
          onClick={() => {
            setDeletedTodo(false)
            const todoRef = firebase.database().ref("Todo").child(todo.id);
            todoRef.remove();
            setDeletedTodo(true)
          }
        }
        >
          <div style={{
            backgroundColor:"#cd0000",
            borderRadius:"15px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height:"100px"
          }}>
            <DeleteIcon style={{
              fill:"white"
            }}/>
            
          </div>
        </SwipeAction>
      </TrailingActions>
    );

    async function e(){
      setNames()  
    }
    e()

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

  function getAll(){
    setIfcategories(false)
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
  }



  const handleChangeCategory = (event) => {
    getAll()
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAdd = (e) => {
    var res = []
    for(var i of personName ){
      res.push({key:res.length,label:i})
    }
    setChipData(res)
    setOpen(false)
    filterTodo(res)
  }


  function filterTodo(res){
   
    var arraycategories = []
    var resarray = []
    for(var i of res){
      try{
        arraycategories.push(i.label)
      }
      catch(e){
        arraycategories.push(i)
      }
    }


    for(var z of todoList){
      
      for(var w of z.categories){     
         if(arraycategories.includes(w)){
            resarray.push(z)
         }
      }
    }
    const unique = [...new Set(resarray)];
    setIfcategories(true)
    setTodoList(unique)

    
    
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    const res = personName;
    for(var i of res ){
      if(i === chipToDelete.label){
        var index = res.indexOf(i);
        res.splice(index,1)
      }
      
    }
    var chipRes = []

    for(var r of res){
      chipRes.push({
        label:r
      })
    }

    setPersonName(res)
    getAll()
    filterTodo(chipRes)
    if(chipRes.length === 0){
    getAll()

    }

  };
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   

    

  

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
            marginTop:"35px",
            width:"100%"
          }}>
            {deletedTodo && (
                <div style={{
                  height:"50px",
                  width:"100%",
                  position:"fixed",
                  top:"40px",
                  display:"flex",
                  justifyContent:"center",
                  zIndex:"100",
                  animation:"dropdownDelete 1s"
                }}

                >
                <Alert sx={{
                  position:"fixed",
                  zIndex:"100"
                }} severity="success" >Todo deleted successfully!</Alert>
                </div>
            )}
             
            
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <CalendarPicker date={date} onChange={(newDate) =>filter(newDate)} className={classes.root}/>      
            </LocalizationProvider>
            {date && (
              <div style={{
                display:"flex",
                alignItems:"center",
                marginBottom:"25px",
                justifyContent:"center"
                
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

            <div style={{
              margin:"10px"
            }}>
            <Button variant="contained" onClick={handleClickOpen}>
            filter a category
          </Button>
          <Dialog open={open} onClose={handleClose} className={classes.category}  PaperProps={{
              style: {
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                width:"100%"
              },
            }}>
            <DialogTitle >Choose a category</DialogTitle>
            <DialogContent >
            
              <div>
                <FormControl sx={{ m: 1, width: "100%"}}>
                  <InputLabel id="demo-multiple-name-label" style={{
                    color:"var(--text-color)"
                  }}>Category</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChangeCategory}
                    input={<OutlinedInput label="Name" />}
                    sx={{
                      color:"var(--text-color)",
                    }}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>
   

          <Paper
      sx={{
        display: 'flex',
        flexDirection:"row",
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        backgroundColor:"transparent",
        color:"var(--text-color)",
        width:"320px"

      }}
      component="ul"
    >
     
      {chipData.length === 0 && (<p>No category chosen</p>)}

      {chipData.map((data) => {
        // let icon;
        
        return (
          <ListItem key={data.key} style={{
            display:"flex",
            flexDirection:"row",
            color:"var(--text-color)"
           
          }} className={classes.category}>
            <Chip
              style={{
                color:"var(--text-color)",
                backgroundColor:""
              }}
              deleteIcon={<DeleteIcon style={{
                fill:"var(--text-color)"
              }} />}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
        </Paper>
            </div>









           
            <div id="todobox" style={{
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginBottom:"100px"

            }}>
           

            <div style={{
              margin:"10px"
            }}>
         
              { todoList ? todoList.map((todo, index) => 
                
                <SwipeableList
                threshold={1}
                className={classes.cards}
                >
                <SwipeableListItem
                   sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                  }}
                   trailingActions={trailingActions(todo)}
                
                >
                  <Datecard todo={todo} ifcategories={ifcategories} key={index} className="test"/>
                </SwipeableListItem>
              </SwipeableList>


              ): ""}

              {/* {ifdate && todoList ? todoList.map((todo, index) => 
                <Card todo={todo} key={index} className="test"/>
              ): ""} */}

            </div>
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
