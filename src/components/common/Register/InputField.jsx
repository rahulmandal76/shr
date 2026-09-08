import React from 'react';
import classes from './Register.module.css';

const InputField = ({ label, type = 'text', name, value, onChange, error, placeholder, required }) => {
    return (
        <div className={classes.inputWrapper}>
            <label className={classes.label}>
                {label} {required && <span className={classes.asterisk}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${classes.input} ${error ? classes.inputError : ''}`}
                autoComplete="off"
            />
            {error && <span className={classes.errorText}>{error}</span>}
        </div>
    );
};

export default InputField;
