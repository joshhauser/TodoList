import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { BoardsService } from 'src/app/services/boards.service';

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
    private boardService: BoardsService
  ) { }

  ngOnInit() {
  }

  // Open menu
  openMenu(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.boardOptions.openMenu();
  }

  deleteBoard(){
    this.boardService.deleteBoard(this.boardID);
  }
}
