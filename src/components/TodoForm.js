import React from "react";
import firebase from "../util/firebase";
import { Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import CalendarPicker from '@mui/lab/CalendarPicker';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color:'red'
  },

  cssLabel: {
    color : 'red !important'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedStandard: {
    borderWidth: '1px',
    borderColor: 'red !important'
  },

});

class TodoForm extends  React.Component{
  state = {
    name: 'InputMode',
  }

  

  handleChange = (e) => {
      // setTitle(e.target.value);
    };
    
  createTodo = (event) => {
      event.preventDefault();
      
      const todoRef = firebase.database().ref("Todo");
      var todo = {}
      const title = ""
      const date = ""

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
          date:this.convertDate(date)
        };
      }
     
      todoRef.push(todo);
      // setTitle("");   
      // setDate(null)
    };
    
    convertDate(dateString) {
      var date = new Date(dateString);
      return date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear();
  }
  
  render(){
    const { classes } = this.props;

  return(
        // <form onSubmit={this.createTodo} >
          <form  >
        
       
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns} >
                {/* <CalendarPicker date={date} onChange={(newDate) =>setDate(newDate)} /> */}
                <CalendarPicker />

          </LocalizationProvider>
          {/* {date && (
            <p style={{
              marginTop:"0",
              color:"#1976d2",
              fontWeight:"bold"
            }}>Date picked: {this.convertDate(date)} </p>
          )}
         */}
        </div>
      

        <div >
          <TextField id="standard-basic"  variant="standard" label="Add task"
          type="text"
          onChange={this.handleChange}  
          value={"title"} 
          name="task"
          required
          className={classes.textField}
          
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
         
          }}
          
          />
           <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric"
          }}
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

}

TodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TodoForm)