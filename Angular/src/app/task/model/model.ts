export class Task {
  id: number;
  content: string;
  boardID: number;

  constructor(id: number, content: string, boardID: number){
    this.id = id;
    this.content = content;
    this.boardID = boardID;
  }

  static deserialize(jsonArray: any[]){
    return jsonArray.map(res => new Task(res.id, res.content, res.boardID));
  }
}


export class Board {
  id: number;
  name: string;
  tasks: Task[];

  constructor(id: number, name: string, tasks: Task[]){
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }
}