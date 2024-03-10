import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Todo from "@/components/ui/todo";
import { Dialog } from "@/components/ui/dialog";
import { CreateTodoDialog } from "./components/ui/todo-modal";
import { nanoid } from "nanoid";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodo(todo) {
    const newTodo = { id: nanoid(), ...todo };
    setTodos((prev) => [...prev, newTodo]);
  }

  return (
    <Card className="w-[350px] m-auto mt-20">
      <CardHeader>
        <CardTitle className="text-xl">D-Todo App</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.map((todo) => (
          <Todo description={todo.description} id={todo.id} />
        ))}
      </CardContent>
      <CardFooter className="text-center flex justify-end">
        <CreateTodoDialog onSubmit={handleAddTodo} />
      </CardFooter>
    </Card>
  );
}
