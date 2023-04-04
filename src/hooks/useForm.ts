import { useState } from "react";

type InputValuesType = {
    name?: string;
    email?: string;
    password?: string;
    code?: string;
};

export function useForm(inputValues: InputValuesType) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
