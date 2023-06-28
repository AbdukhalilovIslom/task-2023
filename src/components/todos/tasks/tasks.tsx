import { AnimatePresence, motion } from "framer-motion";

import { useAppContext } from "../../../context";
import { Todo } from "../../../data/interfaces";
import { MOTION_CONFIGS } from "../../../data";

import "./styles.scss";

export default function Tasks() {
  const { todos, setTodos, todoFilter } = useAppContext();

  const handleClick = (id: number) => {
    if (!todos) return;

    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilter = {
    Title: (a: Todo, b: Todo) => a.title.localeCompare(b.title),
    New: (a: Todo, b: Todo) => b.id - a.id,
    Status: (a: Todo, b: Todo) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1,
  };

  return (
    <div className="tasks">
      <AnimatePresence>
        {todos
          ?.sort(handleFilter[todoFilter])
          .map(({ title, completed, id }, index) => {
            return (
              <motion.div
                onClick={() => handleClick(id)}
                className="task"
                {...MOTION_CONFIGS}
                key={id}
              >
                <input
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="checkbox"
                />
                <span
                  style={{
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  {title}
                </span>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
