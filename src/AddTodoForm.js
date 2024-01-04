import React from "react";
import InputWithLabel from "./InputWithLabel";
const AddTodoForm = function({onAddTodo}) {
    const [todoTitle, setTodoTitle] = React.useState('');
    
    const handleTitleChange = (event) => {
        let newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        setTodoTitle('');
        onAddTodo ({
            title: todoTitle, 
            id: Date.now(),
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