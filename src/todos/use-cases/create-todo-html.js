import { Todo } from "../models/todo"

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) =>{
    if (!todo)  throw new Error ('A TODO objetct is required');

const {done, description, id} = todo; // para acceder a las propiedades del todo

    // completed si todo.done = true
    const html = `
   
                <div class="view">
                    <input class="toggle" type="checkbox" ${done ? 'checked':''}>
                         <label>${description}</label> 
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
               
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML=html;
    liElement.setAttribute ('data-id', id);

    if (done )
        liElement.classList.add('completed');

    return liElement;


}