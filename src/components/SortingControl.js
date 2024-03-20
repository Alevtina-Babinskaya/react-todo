import React from "react";


const SortingControl = function ({generateSortingLink}) {
    const selectHandler = (event) => {
        generateSortingLink(event.target.value);
    }
    
    return (
        <div className="sorting">
        <label>Sort by:</label>
        <select onChange={selectHandler}>
            <option value="default">Default</option>
            <option value="byLastModified">Last Modified</option>
            <option value="byTitle">Title</option>
            <option value="byDueDate">Due Date</option>
        </select>
        </div>  
    );
}
export default SortingControl;