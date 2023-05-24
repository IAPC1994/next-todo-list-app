import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { TodoContext, todoReducer } from './';
import { ITodo } from '../interfaces';
import { todoApi } from '@/todoAPI';


export interface TodoState {
    todos: ITodo[]
}

const TODO_INITIAL_STATE:TodoState = {
    todos: []
}

export const TodoProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(todoReducer, TODO_INITIAL_STATE);

    const addTodo = async( title: string ) => {
        const { data } = await todoApi.post<ITodo>('/todo', { title });
        dispatch({ type: '[Todo] - ADD TODO', payload: data });
    }

    const refreshTodos = async() => {
        const { data } = await todoApi.get<ITodo[]>('/todo');
        dispatch({ type:'[Todo] - REFRESH TODOS', payload: data });
    }

    const updateTodo = async( id: string ,status:boolean ) => {
        try {
            const { data } = await todoApi.put<ITodo>('/todo', { id, status });
            dispatch({ type:'[Todo] - UPDATE TODO', payload: data });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async( id: string ) => {
        try {
            const { data } = await todoApi.delete<ITodo>('/todo', { headers:{ id: id } });
            dispatch({ type: '[Todo] - DELETE TODO', payload: data });
            refreshTodos();
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        refreshTodos();
    },[]);

    return(
       <TodoContext.Provider value={{
            ...state,

            //Methods
            addTodo,
            updateTodo,
            deleteTodo,
       }}>
            { children }
       </TodoContext.Provider>
    );
}