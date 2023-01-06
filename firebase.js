
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, onSnapshot, deleteDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvmjKOiIIg1vMnXMefYrPh615sX5l3a6c",
  authDomain: "crud-firebase-7070b.firebaseapp.com",
  projectId: "crud-firebase-7070b",
  storageBucket: "crud-firebase-7070b.appspot.com",
  messagingSenderId: "154984502750",
  appId: "1:154984502750:web:aa43e7052f9c5cf2eeb94f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

//para guardar los datos en la base de datos
export const saveTask = (title,description) =>{
    addDoc(collection(db, 'tasks'),{title: title, description: description})
}

//obtener todas las tareas, mandarlas a la base de datos y que esta misma se actualice
//automáticamente refrescando la pantalla
export const onGetTasks=(callback)=> onSnapshot(collection(db,'tasks'), callback)


//para eliminar la tarea seleccionada
export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

//OBtener los datos de la base de datos para mostrarlos en la pantalla
//para así poder editarlso después
export const getTask=(id)=> getDoc(doc(db, 'tasks', id))


//Esto actualzia los datos a la base de datos
export const updateTask=(id, newFields)=> updateDoc(doc(db, 'tasks', id), newFields)