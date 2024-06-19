import { RiDeleteBin6Line } from "react-icons/ri";

import "./index.css";

const TodoItem = (props) => {
  const { todoItem, updateTodoStatus, deleteTodo } = props;
  const { id, todo, completed } = todoItem;

  const onChangeCheckbox = (event) => {
    const todoStatus = event.target.checked ? 1 : 0;
    updateTodoStatus(id, todoStatus);
  };

  const onClickDeleteButton = () => {
    deleteTodo(id);
  };

  const checkedStatus = completed === 1 ? true : false;
  const checkedStatusClass = checkedStatus ? "todo-status-complete" : "";

  return (
    <li className="task-item">
      <input
        type="checkbox"
        id={id}
        onChange={onChangeCheckbox}
        checked={checkedStatus}
        className="task-checkbox"
      />
      <label className={"task-label " + checkedStatusClass} htmlFor={id}>
        <p>{todo}</p>
        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteButton}
        >
          <RiDeleteBin6Line />
        </button>
      </label>
    </li>
  );
};

export default TodoItem;
