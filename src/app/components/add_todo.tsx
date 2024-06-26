"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addTodo, deleteTodos, setTodos, updateTodo } from "../redux/slice/add";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const AddTodo = () => {
  const [todo, setTodo] = useState<string>("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      if (editIndex !== null) {
        dispatch(updateTodo({ index: editIndex, text: todo }));
        setEditIndex(null);
      } else {
        dispatch(addTodo(todo));
      }
      setTodo("");
    }
  };
  const handleDelete = (index: number) => {
    console.log(index);
    dispatch(deleteTodos(index));
  };
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setTodo(todos[index]);
    console.log(todos[index]);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center m-auto justify-center"
      >
        <input
          type="text"
          className="p-1 border border-gray-500 rounded-md m-1  outline-none"
          placeholder="write Todo"
          name=""
          value={todo}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTodo(event.target.value)
          }
        />
        <button
          type="submit"
          className="bg-blue-900 rounded-md px-2 text-gray-400 font-semibold p-1"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <ul className="gap-2 mx-3 font-semibold ">
        {todos.map((item, index) => (
          <li
            key={index}
            className="my-3 bg-green-700 p-2 rounded-lg flex flex-row justify-around "
          >
            <span className="max-w-72 overflow-clip ">{item}</span>
            <span className="gap-2 flex-row flex">
              {" "}
              <button
                onClick={() => handleEdit(index)}
                className="mx-2 bg-yellow-500 text-white px-2 py-1 rounded"
              >
                <CiEdit />
              </button>
              <button onClick={() => handleDelete(index)}>
                <MdDelete />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddTodo;
