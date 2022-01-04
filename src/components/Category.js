import React from "react";
import {db} from "../util/firebase";
import {setNames} from "./TodoForm";

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.categories = ["Study","Ooo","Web","Stat"]
    }

    async addCategorie(param) {
        await db.collection('categories').doc().set({
            name:param
        })
    }

    async getCategories(){
        const snapshot = await db.collection('categories').get();
        return snapshot;
    }

    async removeCategory(param){
        const snapshot = await this.getCategories()
        const arr =  snapshot.docs.map(doc => [doc.id , doc.data().name]);
        var deleteid = ""
        
        for(var i of arr){
            console.log(i[1])
            console.log(param)
            if(i[1] === param.label){
                
                deleteid = i[0]
            }
        }

        db.collection("categories").doc(deleteid).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        setNames()


     
    }

}


export const useCategory = new Category();


