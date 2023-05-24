import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '@/database';
import { Todo } from '@/model';

type Data = 
| { message: string }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':{
            postSeedDatabase(req, res);
        }
    }
}
const postSeedDatabase = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    await Todo.deleteMany();
    await Todo.insertMany( seedDatabase.initialData );
    await db.disconnect();

    res.status(200).json({ message: 'Seed Database Completed' });
}

