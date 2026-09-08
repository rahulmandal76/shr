import React from 'react';
import classes from './Register.module.css';

const SelectField = ({ label, name, value, onChange, error, options, required }) => {
    return (
        <div className={classes.inputWrapper}>
            <label className={classes.label}>
                {label} {required && <span className={classes.asterisk}>*</span>}
            </label>
            <div className={classes.selectContainer}>
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${classes.select} ${error ? classes.inputError : ''}`}
                >
                    <option value="" disabled>Select Year</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className={classes.selectArrow}>&#9662;</span>
            </div>
            {error && <span className={classes.errorText}>{error}</span>}
        </div>
    );
};

export default SelectField;
