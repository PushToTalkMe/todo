import { TaskProps } from "./task.interface";
import styles from "./task.module.css";
import cn from "classnames";

export const Task = ({
  id,
  title,
  completed,
  handleCompleteTask,
}: TaskProps) => {
  return (
    <div className={styles.task} onClick={() => handleCompleteTask(id)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={() => {}}
        checked={completed}
        id={`checkbox_${id}`}
        name={`checkbox_${id}`}
      />
      <p
        className={cn(styles.title, {
          [styles.completed]: completed === true,
        })}
      >
        {title}
      </p>
    </div>
  );
};
