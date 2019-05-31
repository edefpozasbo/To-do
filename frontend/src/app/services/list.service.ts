import { Injectable } from '@angular/core';

import {HttpClient} from  "@angular/common/http";
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url:String="http://localhost:3000";

  constructor(private http:HttpClient) { }

  getList(){return this.http.get(this.url+"/lists");}
  postList(list:List){return this.http.post(this.url+"/lists",list);}
  putList(list:List){return this.http.put(this.url+"/lists/"+list._id,list);}
  deleteList(_id:String){return this.http.delete(this.url+"/lists/"+_id);}
}
