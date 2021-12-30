import React from "react";


export default class Active extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:'home'
        }
    }

    setActive(params) {
        this.state = {
            active: params
          }
    

    }

    getActive(){
        return this.state.active;
    }

}


export const useActive = new Active();


