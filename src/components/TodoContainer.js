import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import SortingControl from "./SortingControl";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Heading = styled.h1`color: #467285; text-align: center;`
const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;

const TodoContainer = ({tableName}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortByLink, setSortByLink] = useState("?view=Grid%20view");

    const fetchApi = async ({ method, url, body }) => {
        try {
          setIsLoading(true);
          const options = {
            method: method,
            headers: {
              "Content-Type": "application/json",
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
          const url = `${baseUrl}/${tableName.link}/${sortByLink}`;
          const data = await fetchApi({ method: "GET", url });
          const todos = data.records.map((todo) => ({
            title: todo.fields.title,
            id: todo.id,
            todoStatus: todo.fields.status || false,
          })); 
          setTodoList(todos.sort(sortTodos));
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getTodos();
      }, [sortByLink, tableName]);
    

    const updateTodo = async (todo) => {
        try {
          const url = `${baseUrl}/${tableName.link}/${todo.id}`;
          await fetchApi({
            method: "PATCH",
            url,
            body: { 
              fields: { status: todo.todoStatus, title: todo.title, dateModified: new Date() },
            },
          });
          await getTodos();
        } catch (error) {
          console.log(error);
        }
    };

    const sortTodos = (todoLeft, todoRight) => {
        return todoLeft.todoStatus === todoRight.todoStatus ? 0 : todoLeft.todoStatus ? 1 : -1;
    };

    const addTodo = async (todo) => {
        try {
          const url = `${baseUrl}/${tableName.link}`;
          await fetchApi({
            method: "POST",
            url,
            body: { fields: { title: todo.title, dateModified: new Date() }},  //why we are sending only the title here? Probably because we don't have any other parameters to post
          });
          await getTodos();
        } catch (error) {
          console.log(error);
        }
    };

    const deleteTodo = async(id) => {
        try {
          const url = `${baseUrl}/${tableName.link}/${id}`;
          const data = await fetchApi({
            method: "DELETE",
            url,
          });
          return data;
        } catch (error) {
          console.log(error);
        }
      };

    const generateSortingLink = (sorting) => {
        switch (sorting) {
          case "default":
            setSortByLink("?view=Grid%20view");
            break;
          case "byTitle":
            setSortByLink("?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc");
            break;
          case "byLastModified":
            setSortByLink("?view=Grid%20view&sort[0][field]=dateModified&sort[0][direction]=desc");
            break;
          case "byDueDate":
          default:
            setSortByLink("");
        } 
    };

    const removeTodo = (id) => {
        deleteTodo(id);
        const newList = todoList.filter(
          (item) =>  item.id !== id );
        setTodoList (newList.sort(sortTodos));
    };

    const toggleTodo = (id) => {
        const newTodo = todoList.map((item) => 
          item.id === id ? {...item, todoStatus: !item.todoStatus} : item
        );
          
        setTodoList(newTodo);
        updateTodo(newTodo.find((item) => item.id === id));
    };
      
    const updateTitle = (id, newTitle) => {
        const newTodo = todoList.map((item) => 
          item.id === id ? {...item, title: newTitle} : item
        );
        setTodoList(newTodo);
        updateTodo(newTodo.find((item) => item.id === id));
    };
    
    const reorderTodo = (newTodoList) => {
        setTodoList(newTodoList);
    }  
    
return (
   <>
    <Heading>{tableName.title}</Heading>
    <div style={{display: "flex"}}>
    <AddTodoForm onAddTodo = {addTodo}/>
    <SortingControl generateSortingLink = {generateSortingLink}/>
    </div>
    {isLoading ? (
          <p>Loading...</p>
          ) :(
          <TodoList 
            todoList = {todoList} 
            onRemoveTodo = {removeTodo} 
            onToggleTodo={toggleTodo}
            onReorderTodo={reorderTodo}
            onUpdateNewTitle={updateTitle}/>
          )}
    </>
)
};
export default TodoContainer;