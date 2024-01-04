import InputWithLabel from "./InputWithLabel";
import { useState } from "react";

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
            <button type="submit">Add</button>
        </form>
    );

};
export default AddTodoForm;