import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
 
  const fetchData = async() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      }};
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    
      try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json();

      const todos = data.records.map((todo) => ({
        title: todo.fields.title,
        id: todo.id,
      })); 

      setTodoList(todos);
      setIsLoading(false);
    }
  
   catch (error) {
    console.log(error);
   }
    
  }

  const addTodo = async (todo) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: todo.title,
        }
      }),
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    try {
        
    const response = await fetch( url, options);
    
    if (!response.ok) {
      throw new Error(`Error has occured: ${response.status}`);
    }
    const dataResponse = await response.json();
    
    setTodoList((prevTodoList) => [
      ...prevTodoList,
      {
        id: dataResponse.id,
        title: dataResponse.fields.title,
      },])
    //return dataResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
  };
  



  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    if (isLoading === false) {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));}
    }, [todoList]);

  // const addTodo = (newTodo) => {
  //   setTodoList ([...todoList, newTodo]);
  // };

    const removeTodo = (id) => {
      const newList = todoList.filter(
        (item) =>  item.id !== id );
      setTodoList (newList);
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo = {addTodo}/>{isLoading ? (
              <p>Loading...</p>
              ) :(
              <TodoList todoList = {todoList} onRemoveTodo = {removeTodo}/>
              )}
              </>
            }>
        </Route>
        <Route path='/new' element={
          <h1>New Todo List</h1>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

