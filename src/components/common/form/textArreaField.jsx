import React from "react";
import PropTypes from "prop-types";

const TextArreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-3">
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}

            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={
                        error ? "form-control is-invalid" : "form-control"
                    }
                />
                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextArreaField.defaultProps = {
    type: "text"
};
TextArreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextArreaField;
