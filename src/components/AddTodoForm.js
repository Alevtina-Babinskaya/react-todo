import InputWithLabel from "./InputWithLabel";
import { useState } from "react";
import styles from './form.module.css';
import PropTypes from "prop-types"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AddTodoForm = function({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDueDate, setTodoDueDate] = useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        setTodoTitle('');
        setTodoDueDate('');
        onAddTodo ({
            title: todoTitle,
            dueDate: todoDueDate,

        });
        
    };
    const handleDateChange = (event) => {
        setTodoDueDate(event.target.value);
        console.log(typeof todoDueDate);
    }
    return (
        
            <Popup 
                trigger = {<button className={styles.addButton}>Add</button>}
                modal = "true"
            >
                { close => (
                    <div className="modal">
                        <button className={styles.closeButton} onClick={close}>&times;</button>
                        <h2>New task</h2>
                        <div className="content">
                                <InputWithLabel value={todoTitle} onInputChange = {handleTitleChange} isFocused>
                                Task:
                                </InputWithLabel><br/>
                                <label>Due date:</label>
                                <input type="date" onChange={handleDateChange}/> <br/>
                                <button 
                                    type="submit"
                                    className="addButton"
                                    onClick={(event) => {
                                        handleAddTodo(event);
                                        close();
                                    }}
                                >
                                    Add Task
                                </button>
                            
                        </div>
                        <div className="actions"></div>
                    </div>
                )}
                    
            </Popup>
            
        
    );

};
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func,
};
export default AddTodoForm;