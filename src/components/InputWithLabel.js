import {useRef, useEffect} from "react";
import PropTypes from "prop-types";

    const InputWithLabel = ({isFocused, children, value, onInputChange}) => {
        const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    
    }, [isFocused]);
return (
<>
    <label htmlFor="todoTitle">{children}</label>
    <input value={value} name="title" id="todoTitle" onChange={onInputChange} ref={inputRef}></input>
</>
);
};
InputWithLabel.propTypes = {
    isFocused: PropTypes.bool,
    children: PropTypes.string,
    value: PropTypes.string,
    onInputChange: PropTypes.func
};

export default InputWithLabel
