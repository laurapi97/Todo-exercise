import {Todo} from '../models/todo';
import { createTodoHTML } from './create-todo-html';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos =(elementId, todos = []) =>{ 

    if (!element) // si el elemento no existe se hace la asignación del elemento
        element = document.querySelector(elementId);


    if (!element) throw new Error (`Element ${elementId} not found`);
    

    element.innerHTML ='';

        todos.forEach(todo =>{
            element.append (createTodoHTML(todo));

        });

}