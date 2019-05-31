import { Task } from './task';

export class List {
    _id:String;
    name: String;
    description: String;
    user:String;
    created_at:Date;
    tasks:Task[];
}
