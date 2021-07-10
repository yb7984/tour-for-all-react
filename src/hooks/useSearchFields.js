import { useState, useRef, useEffect } from "react";

/**
 * Hook to handle instant search form fields
 * @param {*} searchParams searchParams state
 * @param {*} setSearchParams setState function for searchParams  
 * @param {*} waitTime how many ms to wait for executing search when stop typing
 * @returns [formData, handleSearchChange, handleSubmit]
 */
const useSearchFields = (searchParams, setSearchParams, waitTime = 1000) => {

    const [formData, setFormData] = useState(searchParams);

    const timerId = useRef(null);

    //clear timeId if unmount
    useEffect(() => {
        return () => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
        }
    }, [])

    const handleSearchChange = (e) => {
        const getValue = (target) => (target.type === "checkbox" ? target.checked : target.value);

        // clear the timer when still type
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        setFormData(fData => ({
            ...fData,
            [e.target.name]: getValue(e.target)
        }));

        // set timer to execute search when stop typing
        timerId.current = setTimeout(() => {

            setSearchParams({
                ...formData,
                [e.target.name]: getValue(e.target)
            });
        }, waitTime);
    }

    // excute search when submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // clear the timer
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        setSearchParams({ ...formData });
    }

    return [formData, handleSearchChange, handleSubmit];
}

export default useSearchFields;