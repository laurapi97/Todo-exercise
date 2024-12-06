
import todoStore from '../store/todo.store';
import html from '../todos/app.html?raw';
import { renderTodos } from './use-cases';


// esto permite agrupar todos los IDS en un solo objeto 
const elementIDs ={
    ClearCompleted: '.clear-completed',
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
   const todoListUL = document.querySelector (elementIDs.TodoList);
   const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted);


   //Listeners

   newDescriptionInput.addEventListener ('keyup', (event)=>{
    if (event.keyCode !== 13) return; // cualquier tecla que presione va a sacarme de la ejecución
   
   
    // solo si es 13 continua
   if (event.target.value.trim().length ===0) return; // continua si hay un valor en el elemento event target value

    todoStore.addTodo(event.target.value); // valor de la caja de texto

    displayTodos(); // renderizar
    event.target.value ='';// despues de haber insertado el valor o la piedra queda vacio
   });



   todoListUL.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]'); // busca el elemento mas cercano con el data id
        todoStore.toggleTodo(element.getAttribute('data-id')); // muestra el id del item
        displayTodos();
    });

// ELIMINAR UN TODO
    todoListUL.addEventListener('click', (event)=>{
        // Verifica si el elemento posee la clase 'destroy'
        if (event.target.classList.contains('destroy')){
         const element = event.target.closest('[data-id]');  // busca el elemento mas cercano con el data id
         if (element) {
            const todoId = element.getAttribute('data-id');// Obtiene el 'data-id'
            console.log(`Eliminando el elemento con el identificador: ${todoId}`); // método TODO
            todoStore.deleteTodo(todoId); // Actualiza laa vista
            displayTodos();
         }
        }
     });


    clearCompletedButton.addEventListener('click', ()=>{
        todoStore.deleteCompleted();
        displayTodos();
    });

     
}