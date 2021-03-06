import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/model/model';
import { BoardsService } from 'src/app/services/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfigureBoardComponent } from '../dialogs/configure-board/configure-board.component';
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
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.boardService.refreshBoards()
    .then(() => this.boards = this.boardService.boards);
  }

  /**
   * Redirect to the selected board
   * @param id : the ID of the board to which the user will be redirected
   */
  goToBoard(id: number){
    this.router.navigate(['board/' + id]);
  }

  // Create a new board
  createBoard(){
    const dialogRef = this.dialog.open(ConfigureBoardComponent, {
      width: '700px',
      height: '450px',
      autoFocus: false,
      data: { 
        boards: this.boards,
        mode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(() => this.boardService.refreshBoards());
  }

}
