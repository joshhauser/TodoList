import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Observable } from 'rxjs';
import { Board } from 'src/app/model/model';


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  title= "To-do List";
  public boards = new Observable<Board[]>();

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit() {
    this.boardService.refreshBoards()
    .then(() => this.boards = this.boardService.boards);
  }

  
}
