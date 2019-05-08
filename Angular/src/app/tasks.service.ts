import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'http://localhost/todolist/API/';

  private tasks = [];

  constructor(private http: HttpClient) { }

  setTasks(){
    return this.tasks;
  }



  addNewTask(t: string){
    let task = {
      task: t
    }
    return this.http.post(this.baseUrl + 'INSERT_TASK.php', { data : task}).toPromise();

  }

  getTasks(): Observable<any[]>{
    return this.http.get(this.baseUrl + 'SELECT_TASKS.php').pipe(
      map((res) => {
        this.tasks = res['data'];
        return this.tasks;
      })
    );
    
  }

  deleteTask(t: any){
    this.http.delete(this.baseUrl + 'DELETE_TASK.php?task=' + t).toPromise();
  }
}
