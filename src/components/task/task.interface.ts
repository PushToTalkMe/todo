export interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  handleCompleteTask: (id: number) => void;
}
