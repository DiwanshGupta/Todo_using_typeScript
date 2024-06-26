import Image from "next/image";
import AddTodo from "./components/add_todo";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen  justify-center">
      <div className="text-2xl font-semibold">Todo List</div>
      <div>
        <AddTodo />
      </div>
    </main>
  );
}
