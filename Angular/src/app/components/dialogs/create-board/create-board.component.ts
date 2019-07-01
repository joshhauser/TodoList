import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardsService } from 'src/app/services/boards.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/app/model/model';
import { BehaviorSubject } from 'rxjs';

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
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: BehaviorSubject<Board[]>,
    public dialogRef: MatDialogRef<CreateBoardComponent>
  ) { }

  ngOnInit() {
  }

  // Validate the form
  validate(){
    const boardNames = this.data.value.map(board => board.name);

    if(boardNames.indexOf(this.form.value.name) != -1){
      this.openSnackBar('You can\'t choose a name which is already used !');
    }
    else{
      const board = {
        name: this.form.value.name,
        color: this.form.value.color != null ? this.form.value.color : '#424242'
      };
      this.boardService.createBoard(board);
      this.dialogRef.close();
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
