import {v4 as uuid}  from 'uuid';

export class Todo{


    /**
     * 
     * @param {Sring} description 
     */
    constructor (description){
        this.id = uuid();
        this.description = description; // descripción del constructor
        this.done = false; // para saber si está marcado como completado o pendiente
        this.createdAt = new Date();
    }

}