import React from "react";
const TodoListItem = function (props) {

    return (
    <li>{props.todo.title}</li>
    );
    };
export default TodoListItem;