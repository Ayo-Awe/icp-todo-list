import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Todo from "@/components/ui/todo";
import { CreateTodoDialog } from "./components/ui/todo-modal";
import { ulid } from "ulid";
import { dtodo_backend as backend } from "../../declarations/dtodo_backend";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let fetchedTodos = await backend.getTodos();
      fetchedTodos = fetchedTodos.sort((a, b) => b.id.localeCompare(a.id));
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  async function handleAddTodo(todo) {
    // optimistic update
    const newTodo = { id: ulid(), ...todo };
    setTodos((prev) => [newTodo, ...prev]);

    // revert on error
    backend.createTodo(newTodo.id, newTodo.description).catch(() => {
      setTodos((prev) => prev.filter((t) => t.id !== newTodo.id));
    });
  }

  async function handleDeleteTodo(id) {
    // optimistic deletes
    backend.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleToggle(id) {
    setTodos((prev) => {
      const todoIndex = prev.findIndex((t) => t.id === id);

      if (todoIndex < 0) return;

      const todo = prev[todoIndex];
      todo.done = !todo.done;
      prev[todoIndex] = todo;

      return [...prev];
    });

    backend.toggleTodo(id);
  }

  return (
    <Card className="w-[450px] m-auto mt-20">
      <CardHeader>
        <CardTitle className="text-xl">ICP Todo App</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.map((todo) => (
          <Todo
            description={todo.description}
            key={todo.id}
            done={todo.done}
            onDelete={() => handleDeleteTodo(todo.id)}
            onToggle={() => handleToggle(todo.id)}
          />
        ))}
      </CardContent>
      <CardFooter className="text-center flex justify-end">
        <CreateTodoDialog onSubmit={handleAddTodo} />
      </CardFooter>
    </Card>
  );
}
