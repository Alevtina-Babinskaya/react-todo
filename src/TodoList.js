
import { useState } from 'react';
import TodoListItem from './TodoListItem';

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
        console.log(draggedTodoId);
    };

    const handleDrop = (e, targetId) => {
        console.log(targetId);
        e.preventDefault();

        if (draggedTodoId !== targetId) {
            console.log(todoList);
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
            console.log(draggedIndex, targetIndex);
            console.log(updatedTodoList);
        }
    };
   




return (
    <ul>
          {todoList.map( function(todoItem) {
          return (<TodoListItem 
            key={todoItem.id} 
            todo={todoItem} 
            onRemoveTodo={onRemoveTodo} 
            toggleTodo={onToggleTodo}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop} 
            onReorderTodo={onReorderTodo}
            onUpdateNewTitle={onUpdateNewTitle}/>);
          })}
           
         </ul>
);
};

export default TodoList;