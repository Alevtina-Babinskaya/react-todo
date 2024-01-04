import React from "react";
const TodoListItem = function ({todo, onRemoveTodo}) {

    return (
    <li>{todo.title} &nbsp; <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button></li>
    );
    };
export default TodoListItem;