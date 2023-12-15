
import TodoListItem from './TodoListItem';

const TodoList = function({todoList, onRemoveTodo}) {
 
return (
    <ul>
          {todoList.map( function(i) {
          return (<TodoListItem key={i.id} todo={i} onRemoveTodo={onRemoveTodo}/>);
          })}
           
         </ul>
);
};

export default TodoList;