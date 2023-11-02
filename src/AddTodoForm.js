import React from "react";
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
            <label htmlFor="todoTitle">Title</label>
            <input value={todoTitle} name="title" id="todoTitle" onChange={handleTitleChange}></input>
            <button type="submit">Add</button>
        </form>
    );

};
export default AddTodoForm;