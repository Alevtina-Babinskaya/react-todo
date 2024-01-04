
const TodoListItem = function ({todo, onRemoveTodo, toggleTodo}) {
    return (
    <li><input type="checkbox" checked={todo.todoStatus || false} onChange={() => toggleTodo(todo)}></input> {todo.title} <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button></li>
    );
    };
export default TodoListItem;