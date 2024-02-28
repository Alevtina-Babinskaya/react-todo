
import { useState } from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from "prop-types";

const TodoList = function({
    todoList, 
    onRemoveTodo, 
    onToggleTodo, 
    onReorderTodo,
    onUpdateNewTitle
}) {

    const [draggedTodoId, setDraggedTodoId] = useState(null);
    const handleDragStart = (e, id) => {
        setDraggedTodoId(id);
        e.currentTarget.classList.add("dragging");
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
            if (draggedTodoId !== targetId) {
                const updatedTodoList = [...todoList];
                const draggedIndex = updatedTodoList.findIndex(
                    (todo) => todo.id === draggedTodoId
                );  // the index of dragged element
                const targetIndex = updatedTodoList.findIndex(
                    (todo) => todo.id === targetId
                );  // the index of target element
                const draggedItem = updatedTodoList[draggedIndex];
                updatedTodoList.splice(draggedIndex, 1);   //remove dragged element from original array
                updatedTodoList.splice(targetIndex, 0, draggedItem); // place dragged element to the place of target element
                onReorderTodo(updatedTodoList);
                setDraggedTodoId(null);
            }
    };
   




return (
    <ul>
          {todoList.map( (todoItem) => {
            return (
           <TodoListItem 
            key={todoItem.id} 
            todo={todoItem} 
            onRemoveTodo={onRemoveTodo} 
            toggleTodo={onToggleTodo}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop} 
            onReorderTodo={onReorderTodo}
            onUpdateNewTitle={onUpdateNewTitle}/>
          )})}
         </ul>
);
};
TodoList.propTypes = {
    todoList: PropTypes.array, 
    onRemoveTodo: PropTypes.func, 
    onToggleTodo: PropTypes.func, 
    onReorderTodo: PropTypes.func,
    onUpdateNewTitle: PropTypes.func
};
export default TodoList;