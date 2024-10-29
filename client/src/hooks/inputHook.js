import { useState, useEffect } from 'react';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [hasValue, setHasValue] = useState(false);

    const changeValue = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        setHasValue(newValue.trim() !== ''); // Update boolean based on input
    };

    useEffect(() => {
        setHasValue(value.trim() !== ''); // Update on value change
    }, [value]);

    return [hasValue, value, changeValue];
};

export default useInput;
