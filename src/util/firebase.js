import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCXNyXcJEeLGQWDjvFXWfBqrwn2ANyOGgY",
    authDomain: "todo-d6484.firebaseapp.com",
     databaseURL:"https://todo-d6484-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "todo-d6484",
    storageBucket: "todo-d6484.appspot.com",
    messagingSenderId: "189561472722",
    appId: "1:189561472722:web:2398d70e3f2df9e7a68f0b"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;