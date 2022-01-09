import React from "react";
import {db} from "../util/firebase";
// import {UpdateChipsDataTodoForm} from "./TodoForm";
// import {UpdateChipsDataHome} from "../Home";
// import {UpdateChipsDataProfile} from "../Profile";


export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.categories = null
        this.update = true
    }


    async addCategorie(param) {
        await db.collection('categories').doc().set({
            name:param
        })
       
        this.update = true
        this.getCategories()
       
    }



    async getCategories(){
        var snapshot = null;
        if(this.update){
            snapshot = await db.collection('categories').get();
            this.categories = snapshot
            this.update = false
             
        }
        else {
            snapshot = this.categories
        }
        
        return snapshot;
    }

    async removeCategory(param){
        const snapshot = await this.getCategories()
        const arr =  snapshot.docs.map(doc => [doc.id , doc.data().name]);
        var deleteid = ""
        
        for(var i of arr){
          
            if(i[1] === param.label){
                
                deleteid = i[0]
            }
        }

        db.collection("categories").doc(deleteid).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


        const newSnapshot = await db.collection('categories').get();
        this.categories = newSnapshot
        this.update = true

     




     
    }

}


export const useCategory = new Category();


