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
  
  public colors = ['#3f72ca','#f3a732','#e85454', '#54e85b', '#54b7e8'];

  public validForm = false;

  constructor(
    private boardService: BoardsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  // Validate the form
  validate(){
    if(this.form.get('name').hasError('required')){
      this.openSnackBar('You can\'t create a board with a blank name.');
    }
    else{
      const board = {
        name: this.form.value.name,
        color: this.form.value.color != null ? this.form.value.color : '#424242'
      };

      this.boardService.createBoard(board);
    }
  }

  /**
   * Open a snack bar to display a message
   * @param message : the message to display
   */
  openSnackBar(message: string){
    let snackbar = this.snackBar.open(message, 'Cancel');
    // A click on the action causes the closing of the snackbar
    snackbar.onAction().subscribe(() => this.snackBar.dismiss());
  }
}
