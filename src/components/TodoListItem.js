
import styles from './TodoListItem.module.css';
import { useState } from "react";
import PropTypes from "prop-types";

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
    const handleSaveClick = () => {
        setEdit(false);
        onUpdateNewTitle(id, newTitle);
    };

    return (
    <li className={todoStatus ? styles.ListItem_completed : styles.ListItem} 
        key={todo.id}
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
            <input className={styles.checkbox} type="checkbox" checked={todoStatus || false} onChange={() => toggleTodo(todo.id)}></input> 
            {edit ? (
            <input value={newTitle} onChange={handleTitleChange}/>
            ) : (
            <span>{title}</span>
            )}
            {edit ? (
            <button type="button" onClick={handleSaveClick}>Save</button>
             ) : (
            <button className={styles.editButton} type="button" onClick={handleEditClick}>Edit</button>
            )}
            <button className={styles.removeButton} type="button" onClick={() => onRemoveTodo(todo.id)}></button>
        </li>
    );
    };
    TodoListItem.propTypes = {
        todo: PropTypes.object, 
        onRemoveTodo: PropTypes.func, 
        toggleTodo: PropTypes.func, 
        onUpdateNewTitle: PropTypes.func,
        handleDragStart: PropTypes.func,
        handleDrop: PropTypes.func,
    };
export default TodoListItem;