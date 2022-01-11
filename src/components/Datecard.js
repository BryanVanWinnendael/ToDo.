import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TaskIcon from '@mui/icons-material/Task';

const useStyles = makeStyles({
  root: {
    "& .MuiListItemText-secondary":{
      color:"var(--text-color)"
    }
   
  }
  
});


function Datecard({ todo,ifcategories }){
  const classes = useStyles();
    return(
      <div className="carddate">
     
        { !ifcategories && (
            <div >
             <ListItem >
              <ListItemAvatar>
                <Avatar sx={{backgroundColor:"#1976d2"}}>
                  {todo.categories.includes("Study") && (
                  <MenuBookIcon />
                  )}
                  {
                    !todo.categories.includes("Study") &&(
                      <TaskIcon />
                    )
                  }
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={todo.title} secondary={todo.date} className={classes.root} />
            </ListItem>
            <Divider variant="inset" component="li" sx={{backgroundColor:"var(--text-color)"}} />
          </div>
               
        )}

          {ifcategories  && (
            <div>
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <MenuBookIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={todo.title} secondary={todo.date} className={classes.root} />
            </ListItem>
            <Divider variant="inset" component="li" sx={{backgroundColor:"var(--text-color)"}} />
        </div>
        )}  
         
     
    </div>
    );
}

export default Datecard;