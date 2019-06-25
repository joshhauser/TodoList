import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task/model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title= "To-do List";
  tasks = [];

  constructor(private tasksService: TasksService){
  }
  
  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.tasksService.refreshTasks()
    .then(() => {
      this.tasks = this.tasksService.tasks.value;
      this.tasks.sort();
    });
  }

  
  addNewTask(taskContent: any){
    if(taskContent != ""){
      this.tasksService.addNewTask(taskContent, null);
      this.tasks.push(taskContent);
      this.tasks.sort();
    }
  }

  deleteTask(task: Task){
    this.tasksService.deleteTask(task);
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}
