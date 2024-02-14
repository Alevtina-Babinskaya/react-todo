import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './components/landing.module.css';
import landingPicture from "./img/tm5.jpg";
import SortingControl from './components/SortingControl';
import AddNewList from './components/AddNewList';
import TodoContainer from './components/TodoContainer';

const baseUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
//const sortByDefault = "?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc";
const Heading = styled.h1`color: #467285;`
const tableList = [
  {
    link: "Default",
    title: "CTD Front End",
  },
  {
    link: "NewList",
    title: "Home chores",
}];


function App() {
  
  
  
  
  

  
  
 


  

  



  const [tableName, setTableName] = useState(tableList[0]);
  const handleListSwitch = (item) => {
    setTableName(item);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <div className='landingPage'>
          <img src={landingPicture} width={800} alt=""></img>
          <p>Welcome to Plantime - the ideal app for planning your precious time</p>
          <a href='/dashboard' className="startButton">Start</a>
        </div>
            }>
        </Route>
        <Route path='/dashboard' element={
          <>
         <div>
          {
            tableList.map((item) => 
            <button className='tabs' id={item.link} onClick={() => handleListSwitch(item)}>{item.title}</button>)
          }
         </div>
          <TodoContainer tableName={tableName} />

                </>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

