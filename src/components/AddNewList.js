// import InputWithLabel from "./InputWithLabel";
// import { useState } from "react";
// import styles from './TodoListItem.module.css';
// import PropTypes from "prop-types"

// const AddNewList = function({onAddList}) {
//     const [todoListTitle, setTodoListTitle] = useState('');
    
//     const handleTitleChange = (event) => {
//         const newTodoTitle = event.target.value;
//         setTodoListTitle(newTodoTitle);
//     };

//     const handleAddList = (event) => {
//         event.preventDefault();
//         setTodoListTitle('');
//         onAddList ({
//             title: todoListTitle, 
//         });

//     };
//     return (
//         <form onSubmit={handleAddList}> 
//             <InputWithLabel value={todoTitle} onInputChange = {handleTitleChange} isFocused>
//                 Title:
//             </InputWithLabel>
//             <button className={styles.addButton} type="submit">Create New List</button>
//         </form>
//     );

// };
// AddNewList.propTypes = {
//     onAddList: PropTypes.func,
// };
// export default AddNewList;