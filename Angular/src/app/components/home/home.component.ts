import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/model/model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title= "To-do List";
  public boards = new Observable<Board[]>();
  
  constructor(
    private boardService: BoardsService
  ) { }

  ngOnInit() {
    this.boardService.refreshBoards()
    .then(() => this.boards = this.boardService.boards);
  }

  goToBoard(id: number){
  }

  createBoard(){
    console.log('ok');
  }

}
