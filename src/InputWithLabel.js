import {useRef, useEffect} from "react";

const InputWithLabel = (props) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    
    }, [props.isFocused]);
return (
<>
    <label htmlFor="todoTitle">{props.children}</label>&nbsp;
    <input value={props.value} name="title" id="todoTitle" onChange={props.onInputChange} ref={inputRef}></input>&nbsp;
</>
);
};
export default InputWithLabel
