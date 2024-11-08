import { useState } from "react";
import { INPUT_TASK_PLACEHOLDER } from "../../constants";
import { FormAddTaskProps } from "./form.interface";
import styles from "./form.module.css";

export const FormAddTask = ({ handleAddTask }: FormAddTaskProps) => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask(title.trim());
        setTitle("");
      }}
    >
      <button type="submit" className={styles.button}>
        &or;
      </button>
      <input
        type="text"
        value={title}
        onChange={handleChangeTitle}
        className={styles.input}
        placeholder={INPUT_TASK_PLACEHOLDER}
        id={"task_title"}
        name={"task_title"}
        required
      />
    </form>
  );
};
