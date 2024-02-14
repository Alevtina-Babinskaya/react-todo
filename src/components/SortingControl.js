import React from "react";


const SortingControl = function ({generateSortingLink}) {
    const selectHandler = (event) => {
        generateSortingLink(event.target.value);
    }
    return (
        <>
        <label>Sort:</label>
        <select onChange={selectHandler}>
            <option value="default">Default</option>
            <option value="byLastModified">By Last Modified</option>
            <option value="byTitle">By Title</option>
            <option value="byDueDate">By Due Date</option>
        </select>
        </>
        
    );
}
export default SortingControl;