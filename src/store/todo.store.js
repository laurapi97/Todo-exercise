import { Todo } from '../todos/models/todo';
// definir como luce el estado glibal de la aplicación

const Filters = {
    All: 'all',
    Completed :'Completed',
    Pending :'Pending'
}


const state = {
    todos : [
        new Todo ( 'Piedra del alma'),
        new Todo ( 'Piedra del infinito'),
        new Todo ( 'Piedra del tiempo'), 
        new Todo ( 'Piedra del espacio'),
        new Todo ( 'Piedra del sol'),
        new Todo ( 'Piedra del amor'),
    ],

    // cuando se llame el objeto tendrá el valor "all"
    filter:Filters.All,
}


// funciones

const initStore = () =>{

    console.log(state);

    console.log('InitStore 🥑');
}


const loadStore = ()=>{

    throw new Error ('Not implemented yet');
}



/**
 * 
 * @param {String} description 
 */
const addTodo = (description) =>{
   if (!description) throw new Error ('Description is required');
   
   state.todos.push (new Todo (description));

}


const getTodos = (filter = Filters.All) =>{
    switch (filter){
        case Filters.All:
            return [...state.todos]; // operador spread para devolver un nuevo arreglo

        case Filters.Completed:
            return state.todos.filter(todo => todo.done )

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done ) // o (todo => todo === false)

        default:
            throw new Error(`Option ${filter} is not valid`);
    }

}

/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = (todoId) =>{ // para actualizar

    state.todos =  state.todos.map(todo =>{
       if (todo.id === todoId) { // si el todo.id es exactamente igual al todoId que estoy recibiendo como argumento
            todo.done = !todo.done; // valor opuesto de todo.done, si estaba en true será false y viceversa
    }
    return todo;
    })
}

const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter (todo => todo.id !== todoId ); // Regresar todos los todo cuyo ID sea diferente al que estoy queriendo eliminar
 
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter (todo => todo.done);

}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All)  =>{
    state.filter = newFilter;

}

// funcion controlada para saber el filtro sin exponer el state

const getCurrentFilter = () =>{
    return state.filter;

}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}

