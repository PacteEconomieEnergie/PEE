import React, { useEffect, useState } from "react";
interface DateInputProps {
    label?: string;
    errorMessage?: string;
    required?: boolean;
    placeholder?: string;
    onFocus?: () => void;
    onChange?: (value: string, name?: string) => void;
    onBlur?: () => void;
}
const CustomDateInput: React.FC<DateInputProps> = ({
    label,
    errorMessage,
    required,
    placeholder,
    onFocus,
    onChange,
    onBlur,
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        // Validate if required and empty
        if (required && inputValue.trim() === "") {
            setError("This field is required.");
        } else {
            setError("");
        }
        // Invoke the onChange callback if provided
        if (onChange) {
            onChange(inputValue,e.target.name);
        }
    };
    // useEffect(() => {
    //     setError(errorMessage);
    //     return () => {
    //         setError("")
    //     }
    // }, [errorMessage])
    return (
        <div className={`w-full form-control ${error ? "input-error" : ""}`}>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type="date"
                placeholder={placeholder}
                className="input input-bordered"
                value={value}
                name={label?.replace(/\s+/g, '')}
                onChange={handleInputChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};
export default CustomDateInput;
