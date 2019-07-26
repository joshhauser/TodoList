import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoardsService } from 'src/app/services/boards.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/app/model/model';

@Component({
  selector: 'app-create-board',
  templateUrl: './configure-board.component.html',
  styleUrls: ['./configure-board.component.scss']
})
export class ConfigureBoardComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl()
  })
  
  public colors = ['#3f72ca','#f3a732','#e85454', '#54e85b', '#54b7e8'];
  public validForm = false;
  public currentBoard: Board;
  public title: string;

  constructor(
    private boardService: BoardsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfigureBoardComponent>
  ) { }

  ngOnInit() {
    if(this.data.mode === 'edit' && this.data.currentBoardID != undefined){
      this.currentBoard = this.data.boards.value.find(board => board.id == this.data.currentBoardID);
      const formValues = {
        name: this.currentBoard.name,
        color: this.currentBoard.color
      }
      this.form.setValue(formValues);
      this.title = "Edit board"
    }
    else{
      this.title = "Create board"
    }
  }

  // Validate the form
  validate(){
    const boardNames = this.data.boards.value.map(board => board.name);

    if(boardNames.indexOf(this.form.value.name) != -1 && this.form.value.name != this.currentBoard.name){
      this.openSnackBar('You can\'t choose a name which is already used !');
    }
    else{
      const board = {
        name: this.form.value.name,
        color: this.form.value.color != null ? this.form.value.color : '#424242'
      };
      
      if(this.data.mode === 'create'){
        this.boardService.createBoard(board);
      }
      else if(this.data.mode === 'edit'){
        board["id"] = this.currentBoard.id;
        this.boardService.editBoard(board);
      }
      else{
        return;
      }

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
