import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
//const sortByLastModifiedTime = "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchApi = async ({ method, url, headers, body }) => {
    try {
      setIsLoading(true);
      const options = {
        method: method,
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: body ? JSON.stringify(body) : null, 
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const url = `${baseUrl}`;
      const data = await fetchApi({ method: "GET", url });
      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
        todoStatus: todo.fields.status || false,
      })); 
      setTodoList(todos.sort(sortByTitle).sort(sortTodos));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  },[]);

  // useEffect(() => {
  //   setCount(todoList.length);
  // }, [todoList]);
 
  // const fetchData = async() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  //     }};
      
  //     try {
  //     const response = await fetch(url, options);
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`)
  //     }
  //     const data = await response.json();

  //     const todos = data.records.map((todo) => ({
  //       title: todo.fields.title,
  //       id: todo.id,
  //       todoStatus: !!todo.fields.status,
  //     })); 
  //     console.log(todos);

  //     setTodoList(todos.sort(sortTodos));
  //     setIsLoading(false);
  //   }
  
  //  catch (error) {
  //   console.log(error);
  //  }
    
  // }

  const addTodo = async (todo) => {
    try {
      const url = `${baseUrl}`;
      const data = await fetchApi({
        method: "POST",
        url,
        headers: {"Content-Type": "application/json"},
        body: { fields: { title: todo.title }},  //why we are sending only the title here? Probably because we don't have any other parameters to post
      });
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // const updateTodo = async (todo) => {
  //   try {
  //     const url = `${baseUrl}/${todo.id}`;
  //     const data = await fetchApi({
  //       method: "PATCH",
  //       url,
  //       headers: {"Content-Type": "application/json"},
  //       body: { 
  //         fields: { todoStatus: todo.status, title: todo.title },
  //       },
  //     });
  //     const results = await getTodos();
  //     console.log(results);
  //     console.log(data.status)
  //     // await getTodos();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  const deleteTodo = async(id) => {
    try {
      const url = `${baseUrl}/${id}`;
      const data = await fetchApi({
        method: "DELETE",
        url,
        headers: {"Content-Type": "application/json"},
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (id) => {
    deleteTodo(id);
    const newList = todoList.filter(
      (item) =>  item.id !== id );
    setTodoList (newList.sort(sortTodos));
  }

    
  
  //   const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
  //   try {
        
  //   const response = await fetch( url, options);
    
  //   if (!response.ok) {
  //     throw new Error(`Error has occured: ${response.status}`);
  //   }
  //   const dataResponse = await response.json();
    
  //   setTodoList((prevTodoList) => [
  //     ...prevTodoList,
  //     {
  //       id: dataResponse.id,
  //       title: dataResponse.fields.title, 
  //       todoStatus: dataResponse.fields.status,
  //     },].sort(sortTodos))
  //   //return dataResponse;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
  // };



  const sortTodos = (todoLeft, todoRight) => {
    return todoLeft.todoStatus === todoRight.todoStatus ? 0 : todoLeft.todoStatus ? 1 : -1;
   }
 
  const sortByTitle = (a, b) => {
    return (a.title.toLowerCase() === b.title.toLowerCase()) ? 0 : (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1;
   
  }

//   const toggleTodo = (id) => {
//     console.log(id);
//     const newTodo = todoList.map((item) => 
//       item.id === id ? {...item, todoStatus: !item.todoStatus}: item);
      
//     setTodoList(newTodo);
//     console.log({newTodo});
//     console.log({todoList});
//     const updatedTodo = todoList.find((item) => item.id === id);
//     updateTodo(updatedTodo);
// //    updateTodo(todoList.find((item) => item.id === id));
//     console.log(todoList.find((item) => item.id === id));

//  };
  


  const toggleTodo = async (todo) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: todo.title,
          status: !todo.todoStatus,
        }
      }),
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${todo.id}`;

    try {     
      const response = await fetch( url, options);
      
      if (!response.ok) {
        throw new Error(`Error has occured: ${response.status}`);
      }
      const dataResponse = await response.json();
      const newTodoListItem = {
          id: dataResponse.id,
          title: dataResponse.fields.title, 
          todoStatus: !!dataResponse.fields.status,
      }
      const newTodo = todoList.map((item) => {
        if (item.id === newTodoListItem.id) { 
          return newTodoListItem;
        }
        return item;
      });
        
      setTodoList(newTodo.sort(sortByTitle).sort(sortTodos));
    } catch (error) {
      console.log(error);
      return null;
    }
 };

 const updateTitle = async (id, newTitle) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
    body: JSON.stringify({
      fields: {
        title: newTitle,
      }
    }),
  };
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

  try {     
    const response = await fetch( url, options);
    
    if (!response.ok) {
      throw new Error(`Error has occured: ${response.status}`);
    }
    const dataResponse = await response.json();
    const newTodoListItem = {
        id: dataResponse.id,
        title: dataResponse.fields.title, 
        todoStatus: !!dataResponse.fields.status,
    }
    const newTodo = todoList.map((item) => 
    item.id === id ? {...item, title: newTitle} : item);
    setTodoList(newTodo.sort(sortByTitle));
  } catch (error) {
    console.log(error);
    return null;
  }
};

 
//  const updateTitle = (id, newTitle) => {
//   const newTodo = todoList.map((item) => 
//   item.id === id ? {...item, title: newTitle} : item);
//   setTodoList(newTodo);
//   updateTodo(todoList.find((item) => item.id === id));
  
// };

const reorderTodo = (newTodoList) => {
  setTodoList(newTodoList);
}

  useEffect(() => {
    if (isLoading === false) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));}
    }, [todoList]);

    
   
    

    const Heading = styled.h1`
    color: #467285;`

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <div className=''>
          <p>Welcome to Plantime - the ideal app for planning your precious time</p>
          <a href='/dashboard'>Start</a>
        </div>
            }>
        </Route>
        <Route path='/dashboard' element={
          <>
          <Heading>Todo List</Heading>
          <AddTodoForm onAddTodo = {addTodo}/>{isLoading ? (
                <p>Loading...</p>
                ) :(
                <TodoList 
                  todoList = {todoList} 
                  onRemoveTodo = {removeTodo} 
                  onToggleTodo={toggleTodo} 
                  onUpdateTitle={updateTitle}
                  onReorderTodo={reorderTodo}
                  onUpdateNewTitle={updateTitle}/>
                )}
                </>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

