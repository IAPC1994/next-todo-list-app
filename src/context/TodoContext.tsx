import { createContext } from 'react';
import { ITodo } from '../interfaces';


interface ContextProps {
    todos: ITodo[];

    // Methods
    addTodo: (title: string) => void;
    updateTodo: (id:string, status: boolean) => void;
    deleteTodo: (id:string) => void;
}

export const TodoContext = createContext({} as ContextProps);
