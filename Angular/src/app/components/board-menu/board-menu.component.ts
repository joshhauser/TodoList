import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit {

  @Input() boardID : number;
  @ViewChild(MatMenuTrigger) boardOptions: MatMenuTrigger;
  
  constructor() { }

  ngOnInit() {
  }

  // Open menu
  openMenu(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.boardOptions.openMenu();
  }
}
