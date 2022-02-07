
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase, ref, push, set,onValue,update,remove } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASjIPTbUAsg6kn7jsx9jOLv7kVJSvP3P0",
  authDomain: "todo-app-e0b80.firebaseapp.com",
  projectId: "todo-app-e0b80",
  storageBucket: "todo-app-e0b80.appspot.com",
  messagingSenderId: "398569697647",
  appId: "1:398569697647:web:3a2d054c8a107364de389a",
  measurementId: "G-QG94P2EL0S"
};







 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
const db = getDatabase();

window.add= function(){
    var obj={
        todo: document.getElementById("inpTOdO").value
    }
    var toDo_ref = push(ref(db,"ToDo")) 
   obj.key = toDo_ref.key; 
    set(toDo_ref,obj)

}


window.get = function(){
    var toDos = document.getElementById("toDo")
    onValue(ref(db,"ToDo"),function(data){
        // console.log(data.val());
        // var TodoList=Object.values(data.val())
        // for(var j =0;j<TodoList;i++){
        //     console.log(TodoList[j])
        // }
        // console.log(TodoList)
        
        toDos.innerHTML=''
        data.forEach(function(Todos){
            console.log(Todos.val())
            var TodoLi =Todos.val().todo
            var TodoKey =Todos.val().key
            if(TodoLi){
                toDos.innerHTML+=`TODO : ${TodoLi}   
                <button onclick="edit('${TodoKey}')">Edit</button>
                <button onclick="DeleteTodo('${TodoKey}')">Delete</button>
                 <br/>`
                
            }
        else{
            toDos.innerHTML='NO TODOS'
        }
        });

    })
    
}
window.edit = function(id){
var NewTodo = prompt(`EDIT TODO`)
console.log(id)
update(ref(db,`ToDo/${id}`),{
    todo:NewTodo
})


}

window.DeleteTodo=function(id){
    remove(ref(db,`ToDo/${id}`))
}