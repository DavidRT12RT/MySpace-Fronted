import { useState } from 'react'

export const useForm = (initialState = "") => {
    const [values, setValues] = useState(initialState);

    const handleInputChange = ({target}) => {
        //We're going to extract the target of the event object
        setValues({
            ...values,
            [target.name]:target.value
        });
    }

    const resetValues = () => {
        setValues(initialState);
    }

    return [
        values,
        setValues,
        handleInputChange,
        resetValues
    ];
}
