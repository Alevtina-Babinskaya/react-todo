import React from 'react';
let List = [
    {"id": 1,
    "title": "Read the textbook" 
  },
  {"id": 2,
  "title": "Watch the videos" 
  },
  {"id": 3,
  "title": "Complete the assignment" 
  }
  ];
const TodoList = function() {
return (
    <ul>
          {List.map((i) => <li key={i.id}>{i.title}</li>)}
           
         </ul>
)
};
export default TodoList;