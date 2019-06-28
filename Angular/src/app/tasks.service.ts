import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'http://localhost/todolist/API/';

  public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

  constructor(private http: HttpClient) { }

  addNewTask(taskContent: string, boardID: number){
    let task = {
      taskContent: taskContent,
      boardID: boardID
    }
    return this.http.post(this.baseUrl + 'INSERT_TASK.php', { data : task}).toPromise()
    .then(() => this.refreshTasks());
  }

  async refreshTasks(){
    const res = await this.http.get(this.baseUrl + 'SELECT_TASKS.php').toPromise();
    return this.tasks.next(Task.unserialize(res['data']));
  }

  deleteTask(task: Task){
    return this.http.delete(this.baseUrl + 'DELETE_TASK.php?id=' + task.id).toPromise()
    .then(() => this.refreshTasks());    
  } 
}
