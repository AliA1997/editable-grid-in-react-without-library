import React, { useImperativeHandle, useRef, useState } from 'react';

const Input = 
(
    {
        id,
        name,
        type,
        value,
        gridRef,
        gridInputReferences,
    }
) => {
    const [stateOfValue, setStateOfValue] = useState(value);
    
    const inputRef = useRef();   
    
    const onChange = evt => {
        setStateOfValue(evt.target.value);
    }

    useImperativeHandle(
        inputRef,
        () => ({
            id,
            name,
            onChange,
            value: stateOfValue,
        })
    );

    return (
        <input 
            ref={inputElement => { inputRef.current = inputElement; gridInputReferences.current.add(inputRef); }} 
            style={{width: '90%', borderRadius: '5px', fontSize: '10px', padding: '2px', paddingRight: 0}} 
            onChange={onChange} 
            value={stateOfValue} type={type} 
        />
    );
}

export default Input;