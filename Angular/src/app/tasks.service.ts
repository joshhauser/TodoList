import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from './task/model/model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'http://localhost/todolist/API/';

  private _tasks = [];
  public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  addNewTask(taskContent: string, boardID: number){
    let task = {
      taskContent: taskContent,
      boardID: boardID
    }
    return this.http.post(this.baseUrl + 'INSERT_TASK.php', { data : task}).toPromise()
    .then(() => this.openSnackBar('The task ' + task.taskContent + ' has been added successfully !'));
  }

  refreshTasks(){
    return this.http.get(this.baseUrl + 'SELECT_TASKS.php').toPromise()
    .then((res) => this.tasks.next(Task.deserialize(res['data'])));
  }

  deleteTask(task: Task){
    this.http.delete(this.baseUrl + 'DELETE_TASK.php?id=' + task.id).toPromise()
    .then(() => this.openSnackBar('The task ' + task.content + ' has been deleted successfully !'));
  }

  openSnackBar(message: string){
    let snackbar = this.snackBar.open(message, 'Cancel');

    snackbar.onAction().subscribe(() => this.snackBar.dismiss());
  }


}
