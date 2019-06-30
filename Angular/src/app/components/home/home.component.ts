import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/model/model';
import { BoardsService } from 'src/app/services/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../dialogs/create-board/create-board.component';
import { MatGridTileFooterCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title= "To-do List";
  public boards = new Observable<Board[]>();
  
  constructor(
    private boardService: BoardsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.boardService.refreshBoards()
    .then(() => this.boards = this.boardService.boards);
  }

  goToBoard(id: number){
    this.router.navigate(['board/' + id]);
  }

  createBoard(){
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '700px',
      height: '450px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => this.boardService.refreshBoards());
  }
}
