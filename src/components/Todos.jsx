import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setNewText(todo.text);
  };

  const submitUpdate = (id) => {
    if (newText.trim()) {
      // Ensure non-empty updates
      dispatch(updateTodo({ id, text: newText.trim() }));
    }
    setEditingId(null);
    setNewText("");
  };

  return (
    <>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-100 px-4 py-2 rounded"
            key={todo.id}
          >
            <input
              type="checkbox"
              className="mr-2"
            />
            {editingId === todo.id ? (
              <input
                className="text-black px-2 py-1 rounded w-screen"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitUpdate(todo.id)} // Allow update on Enter key
              />
            ) : (
              <div
                className = "text-black"
              >
                {todo.text}
              </div>
            )}
            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                  onClick={() => submitUpdate(todo.id)}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="text-white bg-blue-100 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                    onClick={() => startEditing(todo)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-white bg-red-100 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
