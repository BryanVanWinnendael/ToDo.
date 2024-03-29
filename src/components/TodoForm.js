import React, { useState } from "react";
import firebase from "../util/firebase";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { makeStyles } from "@material-ui/core/styles";
import Delete from "./delete.svg";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {useCategory} from "./Category";
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
import Alert from '@mui/material/Alert';

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
    },

  
   
   
  },
  category:{
    "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":{
      backgroundColor:"var(--bg-color)",
      color:"var(--text-color)"
    },
    "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper ":{
      backgroundColor:"var(--bg-color)",

    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":{
      fill:"var(--text-color)"

    },
    "& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon":{
      fill:"var(--text-color)"

    }  

  }

});

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


export async function UpdateChipsDataTodoForm(){
  var arrayres = []
  useCategory.getCategories()
  var res = await useCategory.getCategories()
  const arr = res.docs.map(doc => doc.data())
  for(var i of arr){
    arrayres.push(i.name)
  }
  names = arrayres
}


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


function TodoForm(){
  const [title, setTitle] = useState("");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [date, setDate] = React.useState(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [chipData, setChipData] = React.useState([]);
  const [addedTodo, setAddedTodo] = useState(false);


  async function setChips(){
    UpdateChipsDataTodoForm()
  }
  setChips()
  
  const handleChange = (e) => {
      setTitle(e.target.value);
    };

  const handleChangeCategory = (event) => {
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

  }
    
  const createTodo = (event) => {
      event.preventDefault();
      var categoriesTodo = ["default"]

      for(var i of chipData){
        categoriesTodo.push(i.label)
      }

      const todoRef = firebase.database().ref("Todo");
      var todo = {}
     
      if(date === null){
        todo = {
          title,
          date: false,
          categories: categoriesTodo,
        };
      }
      else{
        todo = {
          title,
          date: convertDate(date),
          categories: categoriesTodo
        };
      }
     
      todoRef.push(todo);
      setTitle("");   
      setDate(null)
      setPersonName([])
      setChipData([])
      setAddedTodo(true)

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

  

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    const res = personName;
    for(var i of res ){
      if(i === chipToDelete.label){
        var index = res.indexOf(i);
        res.splice(index,1)
      }
      
    }
    setPersonName(res)
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  
  
  return(
        <form onSubmit={createTodo}  style={{
          marginTop:"35px",
          width:"100%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"

        }}>
          {addedTodo && (
                <div style={{
                  height:"50px",
                  width:"100%",
                  position:"fixed",
                  top:"-200px",
                  display:"flex",
                  justifyContent:"center",
                  zIndex:"100",
                  animation:"dropdownDelete 3s"
                }}

                >
                <Alert sx={{
                  position:"fixed",
                  zIndex:"100"
                }} severity="success" >Todo added successfully!</Alert>
                </div>
            )}
       
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
          <TextField id="inputtask"  variant="standard" label="Add to do"
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
        <div style={{
          margin:"15px",
       
        }}>
          <Button variant="contained" onClick={handleClickOpen}>
            Add a category
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
        </div>

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
       
        </form>
    );
}



export default TodoForm;