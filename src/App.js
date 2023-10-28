import React from 'react';
let todoList = [
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
function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <h1>
          Todo List
        </h1>
        <ul>
          {todoList.map((i) => <li key={i.id}>{i.title}</li>)}
        
        
        
        </ul>
      </header>
    </div>
  );
}

export default App;
