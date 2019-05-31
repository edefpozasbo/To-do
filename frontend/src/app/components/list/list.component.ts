import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listNew:List={
    _id:"",
    name: "",
    description: "",
    user:"",
    created_at:new Date(),
    tasks:[] as Task[]
  };
  _idModeEdit:String;
  lists:List[];
  editList:Boolean=false;
  tasks:Task[];
  editTask:Boolean=false;

  constructor(private listService:ListService) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.listService.getList()
    .subscribe(res=>{
      this.lists=res["data"] as List[];
    });
  }
  addList(){
    this.listService.postList(this.listNew)
    .subscribe(res=>{
      this.getList();
      this.resetList();
    });
  }
  updateList(listSelected:List){
    this.listService.putList(listSelected)
    .subscribe(res=>{
      this.getList();
      this.resetList();
    });
  }
  deleteList(_id:String){
    if(!confirm("¿Estás seguro que quieres borrar la lista?"))
      return;
    this.listService.deleteList(_id)
    .subscribe(res=>{
      this.getList();
      this.resetList();
    });
  }
  selectList(_id:String){
    this._idModeEdit=_id;
    this.editList=true;
  }
  resetList(){
    this.listNew=new List();
    this.editList=false;
    this._idModeEdit="";
  }
  addTask(_id:String){
    this.lists.find(x=>x._id==_id).tasks.push(new Task());
    this.updateList(this.lists.find(x=>x._id==_id));
  }
  removeTask(_idlist:String,_idtask:String){
    if(!confirm("¿Estás seguro que quieres borrar la tarea?"))
      return;
    const ls=this.lists.find(x=>x._id==_idlist);
    const lr=ls.tasks;
    const it=lr.find(x=>x._id==_idtask);
    const i=lr.indexOf(it);
    if(i>-1){
      lr.splice(i,1);
    }
    this.updateList(ls);
  }
}
