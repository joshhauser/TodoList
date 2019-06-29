import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  public boards = new BehaviorSubject<Board[]>(null);
  
  private url = 'http://localhost/todolist/API/boards/';
  constructor(
    private httpClient: HttpClient
  ) { }

  refreshBoards(){
    return this.httpClient.get(this.url + 'SELECT.php').toPromise()
    .then((res) => this.boards.next(Board.unserialize(res['data'])));
  }

  postBoard(name: string){
    return this.httpClient.post(this.url + 'INSERT.php', {data: name}).toPromise()
    .then(() => this.refreshBoards());
  }

  deleteBoard(boardID: number){
    return this.httpClient.delete(this.url + 'DELETE.php?id=' + boardID).toPromise()
    .then(() => this.refreshBoards());
  }
}
