import mongoose,{ Schema, Model, model } from 'mongoose'
import { ITodo } from "../interfaces";

const todoSchema = new Schema({
    title: { type:String, required: true },
    status: { type: Boolean, required: true, default: false },
    createdAt: { type: Number },
},{
    timestamps: true,
});

const Todo:Model<ITodo> = mongoose.models.Todo || model('Todo', todoSchema);

export default Todo;