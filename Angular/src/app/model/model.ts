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
  color: string;

  constructor(id: number, name: string, color: string){
    this.id = id;
    this.name = name;
    this.color = color;
  }

  static unserialize(jsonArray: any[]){
    return jsonArray.map(res => new Board(res.id, res.name, res.color));
  }
}