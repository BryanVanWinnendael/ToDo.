import React from "react";


export default class Active extends React.Component {
    constructor(props) {
        super(props);
        this.active = 'home'
    }

    setActive(params) {
        this.active = params
    }

    getActive(){
        return this.active;
    }

}


export const useActive = new Active();


