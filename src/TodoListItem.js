
import styled from "styled-components"; 
import styles from './TodoListItem.module.css';
import { useState } from "react";
import TodoList from "./TodoList";
const TodoListItem = function ({
    todo, 
    onRemoveTodo, 
    toggleTodo, 
    onUpdateNewTitle,
    handleDragStart,
    handleDrop
}) {
    const {title, id, todoStatus} = todo;
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
   

    
    const handleEditClick =() => {
        setEdit(true);
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    }
    const handleSaveClick = (event) => {
        setEdit(false);
        onUpdateNewTitle(id, newTitle);
        console.log(id, newTitle); 
    };

    return (
    <li className={todoStatus ? styles.ListItem_completed : styles.ListItem} 
        draggable="true"
        onDragStart={(e) => {
            handleDragStart(e, id);
           // e.currentTarget.classList.add(styled.dragging);
        }}
        // onDragEnd={(e) => {
        //     e.currentTarget.classList.remove(styled.dragging);
        // }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, id)}
    >
            <input className={styles.checkbox} type="checkbox" checked={todoStatus || false} onChange={() => toggleTodo(todo)}></input> 
            {edit ? (
            <input value={newTitle} onChange={handleTitleChange}/>
            ) : (
            <span>{title}</span>
            )}
            {edit ? (
            <button type="button" onClick={handleSaveClick}>Save</button>
             ) : (
            <button className="{style.editButton}" type="button" onClick={handleEditClick}>Edit</button>
            )}
            <button className={styles.removeButton} type="button" onClick={() => onRemoveTodo(todo.id)}></button>
        </li>
    );
    };
export default TodoListItem;