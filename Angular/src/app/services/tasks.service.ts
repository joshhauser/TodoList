import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //private url = 'http://localhost/todolist/API/tasks/'
  private url = 'https://jhauserprojects.000webhostapp.com/todolist/API/tasks/';

  public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

  constructor(private http: HttpClient) { }

  addNewTask(taskContent: string, boardID: number){
    let task = {
      taskContent: taskContent,
      boardID: boardID
    }
    return this.http.post(this.url + 'INSERT_TASK.php', { data : task}).toPromise()
    .then(() => this.refreshTasksByBoardID(task.boardID));
  }

  async refreshTasksByBoardID(id: number){
    const res = await this.http.get(this.url + 'SELECT_TASKS.php?boardID=' + id).toPromise();
    return this.tasks.next(Task.unserialize(res['data']));
  }

  deleteTask(task: Task){
    return this.http.delete(this.url + 'DELETE_TASK.php?id=' + task.id).toPromise()
    .then(() => this.refreshTasksByBoardID(task.boardID));    
  } 
}
