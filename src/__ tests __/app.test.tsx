import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import {
  BUTTON_ADD_SELECTOR,
  BUTTON_DELETE_COMPLETED_SELECTOR,
  COMPLETED_FILTER_TEST_ID,
  INPUT_TASK_PLACEHOLDER,
} from "../constants";
import { App } from "../app";

const createTask = async (taskName: string) => {
  const input = screen.getByPlaceholderText(INPUT_TASK_PLACEHOLDER);
  const addButton = screen.getByText(BUTTON_ADD_SELECTOR);

  fireEvent.change(input, { target: { value: taskName } });
  fireEvent.click(addButton);

  await waitFor(() => screen.getByText(taskName));
};

const completeTask = (taskName: string) => {
  fireEvent.click(screen.getByText(taskName));
};

const deleteCompletedTasks = () => {
  fireEvent.click(screen.getByText(BUTTON_DELETE_COMPLETED_SELECTOR));
};

const applyCompletedFilter = () => {
  fireEvent.click(screen.getByTestId(COMPLETED_FILTER_TEST_ID));
};

describe("ToDo App", () => {
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  test("Добавление новой задачи", async () => {
    const taskName = "Новая задача";
    await createTask(taskName);

    expect(screen.getByText(taskName)).toBeInTheDocument();
  });

  test("Выполнение задачи", async () => {
    const taskName = "Новая задача";
    await createTask(taskName);

    completeTask(taskName);

    expect(screen.getByText(taskName)).toHaveClass("completed");
  });

  test("Удаление выполненных задач", async () => {
    const task1 = "Новая задача 1";
    const task2 = "Новая задача 2";

    await createTask(task1);
    await createTask(task2);

    completeTask(task1);
    deleteCompletedTasks();

    expect(screen.queryByText(task1)).not.toBeInTheDocument();
    expect(screen.getByText(task2)).toBeInTheDocument();
  });

  test("Фильтрация задач", async () => {
    const task1 = "Новая задача 1";
    const task2 = "Новая задача 2";

    await createTask(task1);
    await createTask(task2);

    completeTask(task1);
    applyCompletedFilter();

    expect(screen.getByText(task1)).toBeInTheDocument();
    expect(screen.queryByText(task2)).not.toBeInTheDocument();
  });
});
