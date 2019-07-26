import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/services/boards.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfigureBoardComponent } from '../dialogs/configure-board/configure-board.component';

@Component({
  selector: 'board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit {

  @Input() boardID : number;
  @ViewChild(MatMenuTrigger) boardOptions: MatMenuTrigger;
  
  constructor(
    private router: Router,
    private boardService: BoardsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  // Open menu
  openMenu(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.boardOptions.openMenu();
  }

  editBoard(){
    const dialogRef = this.dialog.open(ConfigureBoardComponent, {
      width: '700px',
      height: '450px',
      autoFocus: false,
      data: { 
        boards: this.boardService.boards,
        mode: 'edit',
        currentBoardID: this.boardID
      }
    });
  }

  deleteBoard(){
    this.boardService.deleteBoard(this.boardID).then(() => this.boardService.refreshBoards());
  }
}
