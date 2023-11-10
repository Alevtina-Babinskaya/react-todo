import React from "react";
const TodoListItem = function ({todo}) {

    return (
    <li>{todo.title} &nbsp; <button type="button">Remove</button></li>
    );
    };
export default TodoListItem;