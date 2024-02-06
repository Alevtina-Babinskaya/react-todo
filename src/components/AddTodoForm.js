import InputWithLabel from "./InputWithLabel";
import { useState } from "react";
import styles from './TodoListItem.module.css';
import PropTypes from "prop-types"

const AddTodoForm = function({onAddTodo}) {
    const [todoTitle, setTodoTitle] = useState('');
    
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        setTodoTitle('');
        onAddTodo ({
            title: todoTitle, 
        });

    };
    return (
        <form onSubmit={handleAddTodo}> 
            <InputWithLabel value={todoTitle} onInputChange = {handleTitleChange} isFocused>
                Title:
            </InputWithLabel>
            <button className={styles.addButton} type="submit">Add</button>
        </form>
    );

};
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func,
};
export default AddTodoForm;