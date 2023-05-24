import { useContext } from "react";
import { TodoContext } from "@/context";
import { dateFunctions } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

interface Props {
    _id         : string;
    title       : string;
    status      : boolean;
    createdAt   : number;
}
export const TodoItem = ({ _id, title, status, createdAt }:Props) => {
    
    const { updateTodo, deleteTodo } = useContext(TodoContext);

    const handleOnChange = () => {
        updateTodo( _id, !status );
    }

    const onDeleteClick = () => {
        deleteTodo( _id );
    }

    return (
        <div className={`grid gap-4 rounded-lg p-2 ${ status ? 'bg-green-500 dark:bg-green-300': 'bg-violet-400 dark:bg-violet-200' }  text-white shadow-md dark:text-black mx-2 fadeIn`}>
            <div className="flex justify-between break-all">
                <h2 className={`font-semibold ${ status ? 'text-decoration-line: line-through' : ''}`}>{title}</h2>
                <button className="text-white ml-2 dark:text-black" onClick={ onDeleteClick }><FontAwesomeIcon icon={ faTrashCan } /></button>
            </div>
            <div className="flex justify-between items-end">
                <div className="flex">
                    <input type='checkbox' name='status' checked={status} onChange={ handleOnChange } />
                    <p className="ml-1">{ status ? 'Completed!':'Incompleted' }</p>
                </div>
                <p className="text-xs">{dateFunctions.getFormatDistanceToNow(createdAt)}</p>
            </div>
        </div>
    );
}