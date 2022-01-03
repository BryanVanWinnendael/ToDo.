import React from "react";


export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.categories = ["Study","Ooo","Web","Stat"]
    }

    addCategorie(param) {
        this.categories.push(param)
    }

    getCategories(){
        return this.categories;
    }

}


export const useCategory = new Category();


