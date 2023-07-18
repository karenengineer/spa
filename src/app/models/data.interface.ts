export interface DataInterface {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildModel;
}

export interface ChildModel {
  id: string;
  color: string;
}
