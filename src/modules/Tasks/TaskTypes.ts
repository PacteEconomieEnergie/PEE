export interface Task {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
  tint: number;
}

export  type ColumnsState = Record<string, Column>;
// export interface TaskType {
//   id: string;
//   content: string;
//   // Add other properties as needed
// }