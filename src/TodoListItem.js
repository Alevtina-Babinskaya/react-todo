
import styled from "styled-components"; 
import styles from './TodoListItem.module.css';
const TodoListItem = function ({todo, onRemoveTodo, toggleTodo}) {
    return (
    <li className={todo.todoStatus ? styles.ListItem_completed : styles.ListItem}>
        <input className={styles.checkbox} type="checkbox" checked={todo.todoStatus || false} onChange={() => toggleTodo(todo)}></input> 
        <span>{todo.title}</span> 
        <button className={styles.removeButton} type="button" onClick={() => onRemoveTodo(todo.id)}></button>
    </li>
    );
    };
export default TodoListItem;