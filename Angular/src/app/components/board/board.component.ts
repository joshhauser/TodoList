import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/model';
import { TasksService } from 'src/app/services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  title= "To-do List";
  tasks = [];
  public _tasks = new Observable<Task[]>(null);
  public currentBoardID: number;

  constructor(
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.currentBoardID = Number(params.get('boardID'));
      this.tasksService.refreshTasksByBoardID(this.currentBoardID)
      .then(() => this._tasks = this.tasksService.tasks); 
    });
  }
  
  addNewTask(taskContent: any){
    if(taskContent != ""){
      this.tasksService.addNewTask(taskContent, this.currentBoardID);
    }else{
      this.openSnackBar('A task can\'t be empty !');
    }
  }

  deleteTask(task: Task){
    this.tasksService.deleteTask(task)
    .then(() => this.openSnackBar('The task ' + task.content + ' has been deleted successfully !'));
  }

  openSnackBar(message: string){
    let snackbar = this.snackBar.open(message, 'Cancel');
    snackbar.onAction().subscribe(() => this.snackBar.dismiss());
  }

}