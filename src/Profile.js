import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import {useCategory} from "./components/Category";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


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
  }

});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',

        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',

      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
    width:"auto",
  
  
  }));



function Profile() {
  const [mode,setMode] = useState(localStorage.getItem("theme"));
  const [title, setTitle] = useState("");
  const classes = useStyles();
  const  [chipData, setChipData] = React.useState([]);
    
     
  const handleChange = (e) => {
    setTitle(e.target.value);
   
  };

  const onsubmit = (event) =>{
    event.preventDefault();
    useCategory.addCategorie(title).then(() =>{
      getCategories()
    })
    setTitle("")

  }

  const handleDelete = (chipToDelete) => () => {
    useCategory.removeCategory(chipToDelete).then(() =>{
      getCategories()
    })
   
  };


  async function getCategories(){
    await useCategory.getCategories().then((e) =>{
      const arr = e.docs.map(doc => doc.data());
      var res = []
      for(var i of arr ){
        res.push({key:res.length,label:i.name})
      }
      setChipData(res)
    })
    
   
  }
  
  useEffect(() => {
    getCategories()
  }, []);

  
   

        
    function changemode(){
        if(localStorage.getItem("theme") == null ||localStorage.getItem("theme") === "lightmode") {
            document.body.classList.add("dark-theme")
            setMode("darkmode")
            localStorage.setItem("theme","darkmode")
                  
        }
        else{
         document.body.classList.remove("dark-theme")
         setMode("lightmode")
         localStorage.setItem("theme","lightmode")
       
        }
        
    }

    return (
        <div>
            <div style={{
                marginTop:"200px"
            }}>
            <FormControlLabel 
                style={{
                    color:"var(--text-color)"
                }}
                control={<MaterialUISwitch  checked={mode === "darkmode" ? true:false } onClick={changemode} />}
                label="Dark Mode"
            />
              
            </div>

            <div style={{
              margin:"10px"
            }}>
            <form onSubmit={onsubmit} style={{
          display:"flex",
          flexDirection:"column",
          }}>
              <TextField id="inputtask"  variant="standard" label="Add category"
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
            </form>
          </div>
          
          {chipData.length !== 0 && (
            <div>
            <Paper
            sx={{
              display: 'flex',
              flexDirection:"row",
              justifyContent: 'center',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 2,
              backgroundColor:"transparent",
              color:"var(--text-color)",
              width:"320px"

            }}
            component="ul"
          >
            {chipData.map((data) => {
       

            return (
              <ListItem key={data.key}
              style={{
                display:"flex",
                flexDirection:"row",
                color:"var(--text-color)"
              
              }}
              >
                <Chip
                  sx={{
                    color:"var(--text-color)",
                    fill:"var(--text-color)"
                    
                    
                  }}
                  deleteIcon={<DeleteIcon style={{
                    fill:"var(--text-color)"
                  }} />}
                  label={data.label}
                  onDelete={data.label === 'Study' ? undefined : handleDelete(data)}
                />
          </ListItem>
              );
            })}
          </Paper>
            </div>
          )}
          {
            chipData.length === 0 && (
              <Box sx={{ width: 300 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
            )
          }
            
           
        </div>
    )
}

export default Profile
