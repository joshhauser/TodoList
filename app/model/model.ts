export class Task {
  id: number;
  content: string;
  boardID: number;

  constructor(id: number, content: string, boardID: number){
    this.id = id;
    this.content = content;
    this.boardID = boardID;
  }

  static unserialize(jsonArray: any[]){
    return jsonArray.map(res => new Task(res.id, res.content, res.boardID));
  }
}


export class Board {
  id: number;
  name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }

  static unserialize(jsonArray: any[]){
    return jsonArray.map(res => new Board(res.id, res.name));
  }
}