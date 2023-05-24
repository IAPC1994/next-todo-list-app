import type { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '@/interfaces'
import { db } from '@/database';
import { Todo } from '@/model';
import { isValidObjectId } from 'mongoose';

type Data =
    | { message: string }
    | ITodo
    | ITodo[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getAllTodos( res );
        case 'POST':
            return postTodo(res, req);
        case 'PUT':
            return updateTodo( res, req );
        case 'DELETE':
            return deleteTodo( res, req );
        default:
            return res.status(400).json({ message: 'Endpoint incorrect' })
    }
}

const getAllTodos = async(res: NextApiResponse<Data>) => {
    await db.connect();
    const todos = await Todo.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    res.status(200).json( todos );
}
const postTodo = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
    const { title = '' } = req.body;

    const newTodo = new Todo({
        title,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await newTodo.save();
        await db.disconnect();

        return res.status(201).json(newTodo);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something goes wrong, check the server logs' });
    }
}

const updateTodo = async(res: NextApiResponse<Data>, req: NextApiRequest) =>  {
    const { id } = req.body;

    if( !isValidObjectId(id) ) return res.status(400).json({ message: 'The ID is not valid' });
    
    await db.connect();

    const todoToUpdate = await Todo.findById( id );

    if( !todoToUpdate ){
        await db.disconnect();
        return res.status(400).json({ message: 'No todo with this ID: ' + id });
    }

    const { status = todoToUpdate.status } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedTodo! );
    } catch (error:any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }
}

const deleteTodo = async(res: NextApiResponse<Data>, req: NextApiRequest) => {
    const { id } = req.headers;

    if( !isValidObjectId(id) ) return res.status(400).json({ message: 'The ID is not valid' });
    
    await db.connect();
    const todoDeleted = await Todo.findByIdAndDelete( id );
    await db.disconnect();

    if( !todoDeleted ){
        return res.status(400).json({ message: 'No todos with this ID: ' + id });
    }

    return res.status(200).json({ message: 'Todo Deleted' });
}

