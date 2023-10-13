import react from "react";
const AddTodoForm = function() {
    
    const handleAddTodo = (event) => {
        event.preventDefault();
        let todoTitle = event.target.title.value;
        console.log(todoTitle);
        event.target.title.value = "";

    };
    return (
        <form onSubmit={handleAddTodo}> 
            <label htmlFor="todoTitle">Title</label>
            <input name="title" id="todoTitle"></input>
            <button type="submit">Add</button>
        </form>
    );

};
export default AddTodoForm;