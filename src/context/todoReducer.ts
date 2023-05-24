import { ITodo } from '../interfaces';
import { TodoState } from './';

type TodoActionType = 
   | { type: '[Todo] - ADD TODO', payload:ITodo }
   | { type: '[Todo] - UPDATE TODO', payload:ITodo }
   | { type: '[Todo] - DELETE TODO', payload:ITodo }
   | { type: '[Todo] - REFRESH TODOS', payload: ITodo[]}


export const todoReducer = ( state: TodoState, action:TodoActionType ):TodoState => {

    switch(action.type){
        case '[Todo] - ADD TODO':
            return{
                ...state,
                todos: [ ...state.todos, action.payload ]
            }
        case '[Todo] - REFRESH TODOS':
            return{
                ...state,
                todos: [...action.payload]
            }

        case '[Todo] - UPDATE TODO':
            return{
                ...state,
                todos: state.todos.map( todo => {
                    if( todo._id === action.payload._id ){
                        todo.status = action.payload.status
                    }
                    return todo;
                })
            }
        case '[Todo] - DELETE TODO':
            return{
                ...state,
                todos: state.todos.filter( todo => todo._id !== action.payload._id )
            }

        default:
            return state;
    }
}