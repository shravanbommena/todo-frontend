import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  // const [showError, setShowError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");

  const getTodoData = async () => {
    try {
      const response = await axios.get(
        "https://todo-backend-20p8.onrender.com/"
      );
      setTodoData(response.data);
      setTodoInput("");
    } catch (e) {
      console.log(e.message);
    }
  };

  const onClickAddTodoButton = async () => {
    if (todoInput !== "") {
      const response = await axios.post(
        "https://todo-backend-20p8.onrender.com/todos",
        {
          todo: todoInput,
        }
      );
      if (response.status === 200) {
        getTodoData();
      }
    } else {
      alert("Enter any task that needs to be done");
    }
  };

  const onChangeTodoInput = (event) => {
    setTodoInput(event.target.value);
  };

  const updateTodoStatus = async (id, todoStatus) => {
    const response = await axios.put(
      `https://todo-backend-20p8.onrender.com/todos/${id}`,
      {
        completed: todoStatus,
      }
    );
    if (response.status === 200) {
      getTodoData();
    }
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(
      `https://todo-backend-20p8.onrender.com/todos/${id}`
    );
    if (response.status === 200) {
      getTodoData();
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <img
          src="https://shanture.com/wp-content/uploads/2024/06/cropped-2-180x131.png"
          alt="logo"
          height={80}
          width={100}
        />
        <h1 className="heading">Todo-List</h1>
      </div>
      <div className="todo-top-section">
        <h2>Create a Todo</h2>
        <div className="todo-task-input-section">
          <input
            type="text"
            className="todo-user-input"
            value={todoInput}
            onChange={onChangeTodoInput}
            placeholder="What needs to be done?"
          />
          <button
            className="todo-add-button"
            type="button"
            onClick={onClickAddTodoButton}
          >
            Add
          </button>
        </div>
      </div>
      <div className="todo-bottom-section">
        <h2 className="task-list-heading">Things to do:</h2>
        <ul className="task-list">
          {todoData.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              updateTodoStatus={updateTodoStatus}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
