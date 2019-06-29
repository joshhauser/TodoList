import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardsService } from 'src/app/services/boards.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl()
  })

  constructor(
    private board: BoardsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  validate(){
    if(this.form.get('name').hasError('required')){
      this.openSnackBar('You can\'t create a board with a blank name.');
    }
    else{
      const board = {
        name: this.form.value.name,
        color: this.form.value.color
      }
    }
  }

  openSnackBar(message: string){
    let snackbar = this.snackBar.open(message, 'Cancel');
    snackbar.onAction().subscribe(() => this.snackBar.dismiss());
  }
  


}
