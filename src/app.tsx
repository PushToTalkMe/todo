import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { TaskI } from "./interfaces/todo.interface";
import { Task, FormAddTask, ButtonFilter } from "./components";
import { declensionWord } from "./helpers/declensionWord";

export const App = () => {
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const handleCompleteTask = (id: number) => {
    const changedTasks = tasks.map((task) =>
      id === task.id
        ? { id: task.id, title: task.title, completed: !task.completed }
        : task
    );
    setTasks(changedTasks);
    localStorage.setItem("tasks", JSON.stringify(changedTasks));
  };

  const handleAddTask = (title: string) => {
    const newTasks = [{ id: Date.now(), title, completed: false }, ...tasks];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteCompletedTasks = () => {
    const deletedTasks = tasks.filter((task) => !task.completed);
    setTasks(deletedTasks);
    localStorage.setItem("tasks", JSON.stringify(deletedTasks));
  };

  const countCompleted = () => {
    let count = 0;
    tasks.forEach((task) => !task.completed && count++);
    return count;
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => !!task.completed)
      : tasks.filter((task) => !task.completed);

  useEffect(() => {
    const storage = localStorage.getItem("tasks");
    storage && setTasks(JSON.parse(storage));
  }, []);

  return (
    <div className={styles.app}>
      <span className={styles.header}>todos</span>
      <div className={styles.todo}>
        <FormAddTask handleAddTask={handleAddTask} />
        <div className={styles.tasks}>
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              handleCompleteTask={handleCompleteTask}
            />
          ))}
        </div>
        <div className={styles.footer}>
          {countCompleted() === 0 ? (
            <span className={styles.span}>Все задачи выполнены</span>
          ) : (
            <span className={styles.span}>
              Осталось выполнить{" "}
              {`${countCompleted()} ${declensionWord(countCompleted(), [
                "задачу",
                "задачи",
                "задач",
              ])}`}
            </span>
          )}

          <div className={styles.buttons}>
            <ButtonFilter
              filter="all"
              filterState={filter}
              setFilter={setFilter}
            >
              Все
            </ButtonFilter>
            <ButtonFilter
              filter="active"
              filterState={filter}
              setFilter={setFilter}
            >
              Активные
            </ButtonFilter>
            <ButtonFilter
              filter="completed"
              filterState={filter}
              setFilter={setFilter}
            >
              Выполненные
            </ButtonFilter>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleDeleteCompletedTasks()}
          >
            Удалить выполненные
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
