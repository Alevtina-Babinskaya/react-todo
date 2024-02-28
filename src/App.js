import { useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/landing.module.css';
import landingPicture from "./img/tm5.jpg";
import TodoContainer from './components/TodoContainer';

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
          <h1>Welcome to Plantime</h1>
          <a href='/dashboard' className="startButton">Start</a>
        </div>
            }>
        </Route>
        <Route path='/dashboard' element={
          <div className="container">
         <div>
          {
            tableList.map((item) => 
            <button className='tabs' id={item.link} onClick={() => handleListSwitch(item)}>{item.title}</button>)
          }
         </div>
          <TodoContainer tableName={tableName} />

                </div>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

