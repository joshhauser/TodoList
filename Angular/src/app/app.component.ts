import { Component } from '@angular/core';
import { TasksService } from './tasks.service';

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
    this.tasksService.getTasks().subscribe(res => this.tasks = res);
    this.tasks.sort();
  }

  
  addNewTask(t: any){
    if(t != ""){
      this.tasksService.addNewTask(t);
      this.tasks.push(t);
      this.tasks.sort();
    }
  }

  deleteTask(t: any){
    if(t != ""){
      this.tasksService.deleteTask(t);
      let index = this.tasks.indexOf(t);
      this.tasks.splice(index, 1);
    }
  }
}
