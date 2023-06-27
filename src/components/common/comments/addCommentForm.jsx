import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextArreaField from "../form/textArreaField";

const initialState = { userId: "", content: "" };
const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialState);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите Автора!"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData(initialState);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isIvalid = validate();
        if (!isIvalid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users && users.map((user) => ({ label: user.name, value: user._id }));
    return (
        <div>
            <h2>New Comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    name="userId"
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption="Выберите пользователя.."
                    options={arrayOfUsers}
                    error={errors.userId}
                />
                <TextArreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
