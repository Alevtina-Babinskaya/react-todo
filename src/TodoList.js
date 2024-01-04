import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = function({todoList}) {
 
return (
    <ul>
          {todoList.map( function(i) {
          return (<TodoListItem key={i.id} todo={i}/>);
          })}
           
         </ul>
);
};

export default TodoList;