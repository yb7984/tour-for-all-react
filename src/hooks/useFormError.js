import { useState } from "react";
/**
 * Hook to handle submit form error massages
 * @returns [errorMsg , translateErrorMsg , resetErrorMsg]
 */
const useFormError = () => {
    const INIT_VALUE = {
        formErrors: [],
        fieldErrors: {}
    };
    const [errorMsg, setErrorMsg] = useState(INIT_VALUE);

    /**
     * translate form errors information to certain format of mesage
     * @param {*} errors 
     */
    const translateErrorMsg = (errors) => {

        const message = {
            formErrors: [],
            fieldErrors: {}
        };

        if (errors) {
            errors.forEach(error => {
                const reg = /instance\.[a-zA-Z0-9_]+/g;
                const fieldNames = error.match(reg);

                if (fieldNames) {
                    const name = fieldNames[0].split(".")[1];
                    const msg = error.replace(reg, name);

                    if (message.fieldErrors[name] === undefined) {
                        message.fieldErrors[name] = [];
                    }

                    message.fieldErrors[name].push(msg);
                } else {
                    message.formErrors.push(error);
                }
            });
        }
        setErrorMsg(message);
    }

    const resetErrorMsg = () => {
        setErrorMsg(INIT_VALUE);
    }

    return [errorMsg, translateErrorMsg, resetErrorMsg];
}

export default useFormError;