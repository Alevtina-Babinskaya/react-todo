
import TodoListItem from './TodoListItem';

const TodoList = function({todoList, onRemoveTodo, onToggleTodo}) {
 
return (
    <ul>
          {todoList.map( function(todoItem) {
          return (<TodoListItem key={todoItem.id} todo={todoItem} onRemoveTodo={onRemoveTodo} toggleTodo={onToggleTodo} />);
          })}
           
         </ul>
);
};

export default TodoList;