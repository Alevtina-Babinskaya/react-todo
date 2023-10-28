import React from 'react';
import TodoListItem from './TodoListItem';
const List = [
    {"id": 0,
    "title": "Read the textbook" 
  },
  {"id": 1,
  "title": "Watch the videos" 
  },
  {"id": 2,
  "title": "Complete the assignment" 
  }
  ];
const TodoList = function() {
 
return (
    <ul>
          {List.map( function(i) {
          return (<TodoListItem key={i.id} todo={i}/>);
          })}
           
         </ul>
);
};

export default TodoList;