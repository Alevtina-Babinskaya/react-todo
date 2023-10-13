import react from "react";
const AddTodoForm = function() {
    const handleChange = (event) => {
        console.log(event);
    }
    return (
        <form>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" onChange={handleChange}></input>
            <button>Add</button>
        </form>
    );

}
export default AddTodoForm;