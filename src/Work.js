import React from "react";
import './App.css';



function Work() {

  return (

    <div className="workbox" style={{
      width:"100%",
      height:"100vh",
      display:"flex",
      flexDirection:"column"
     
    }}>
      {/* <h1
      style={{
        paddingLeft:"5px",
        paddingRight:"5px",
        paddingBottom:"2px",
        color:"white",
        backgroundColor:"#282c34",
        borderRadius:"15px",
        boxShadow: "5px 5px 8px rgb(136 136 136 / 38%)",
      }}
      >Work </h1> */}
      {/* <div style={{
     
        
    
      }}> */}
      <iframe style={{
        borderRadius:"25px",
        boxShadow: "5px 5px 8px rgb(136 136 136 / 38%)",
        marginLeft:"10px",
        marginRight:"10px",

      }}
      id="iframeId" width="400px" height="300px" src="https://www.youtube.com/embed/videoseries?list=PL6NdkXsPL07IOu1AZ2Y2lGNYfjDStyT6O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      {/* </div> */}
      </div>

  );
}

export default Work;
