
import todoStore from '../store/todo.store';
import html from '../todos/app.html?raw';
import { renderTodos } from './use-cases';


// esto permite agrupar todos los IDS en un solo objeto 
const elementIDs ={
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */


export const App = (elementId) =>{


    const displayTodos = () =>{  
        const todos = todoStore.getTodos(todoStore.getCurrentFilter()); // aplicar el filtro seleccionado
        renderTodos(elementIDs.TodoList, todos);
    }


// Función anónima autoinvocada , función App () se llama
   (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;

        // llamo a la función, mando el id , y este id manda donde quiero renderizar
        document.querySelector(elementId).append(app);
        displayTodos();
   }) ();



   // Referencias HTML

   const newDescriptionInput = document.querySelector (elementIDs.NewTodoInput);


   //Listeners

   newDescriptionInput.addEventListener ('keyup', (event)=>{
    if (event.keyCode !== 13) return; // cualquier tecla que presione va a sacarme de la ejecución
   
   
    // solo si es 13 continua
   if (event.target.value.trim().length ===0) return; // continua si hay un valor en el elemento event target value

    todoStore.addTodo(event.target.value); // valor de la caja de texto

    displayTodos();
    event.target.value ='';// despues de haber insertado el valor o la piedra queda vacio
   });
}