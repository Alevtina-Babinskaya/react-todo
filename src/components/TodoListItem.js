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
    const {title, id, todoStatus, dueDate} = todo;
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
        }}

        onDragEnd={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("dragging");
        }}

        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, id)}
    >
            <input className={styles.checkbox} type="checkbox" checked={todoStatus || false} onChange={() => toggleTodo(todo.id)}></input> 
            {edit ? (
            <span style={{flexGrow: "8"}}>
                <input value={newTitle} onChange={handleTitleChange} className='editTodo'/>
            </span>
            ) : ( 
            <span>{title}</span>
            )}
            <p>{dueDate}</p>
            {edit ? (
            <button className={styles.saveButton} type="button" onClick={handleSaveClick}></button>
             ) : (
            <button className={styles.editButton} type="button" onClick={handleEditClick}></button>
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