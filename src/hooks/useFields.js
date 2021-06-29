import { useState } from "react";

const useFields = (initialValue) => {

    const [formData, setFormData] = useState(initialValue);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const resetFormData = () => {
        setFormData(initialValue);
    }

    return [formData, handleChange, setFormData, resetFormData];
}

export default useFields;