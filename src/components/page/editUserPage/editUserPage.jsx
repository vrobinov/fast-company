import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as yup from "yup";

import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/table/backButton";

const EditUserPage = (props) => {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const { currentUser, updateUser } = useAuth();

    const validateSchema = yup.object().shape({
        qualities: yup
            .array()
            .of(yup.object())
            .min(1, "At least one quality is required"),

        profession: yup.string().required("Profession is required"),

        email: yup
            .string()
            .required("Email is required")
            .email("Email is not valid"),
        name: yup
            .string()
            .required("Name is required")
            .min(2, "The name cannot be shorter than 2 characters")
    });

    const { professions, isLoading: professionLoading } = useProfessions();
    const professionList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    const { qualities, isLoading: qualityLoading } = useQualities();
    const qualityList = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));

    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((error) => setErrors({ [error.path]: error.message }));

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const transformQualities = (arr) => {
        return arr.map((item) =>
            qualityList.find((quality) => {
                return quality.value === item;
            })
        );
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getQualities = (arr) => {
        const qualityArray = [];
        for (const item of arr) {
            qualityArray.push(item.value);
        }
        return qualityArray;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        await updateUser({
            ...data,
            qualities: getQualities(data.qualities)
        });

        history.push(`/users/${currentUser._id}`);
    };

    useEffect(() => {
        if (!professionLoading && !qualityLoading && currentUser && !data) {
            setData(() => ({
                ...currentUser,
                qualities: transformQualities(currentUser.qualities)
            }));
        }
        // eslint-disable-next-line
    }, [professionLoading, qualityLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        validate();
        // eslint-disable-next-line
    }, [data]);

    return !isLoading && data ? (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 mb-3">
                    <BackHistoryButton />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" }
                            ]}
                            value={data.sex}
                            name="sex"
                            label="Choose your gender..."
                            onChange={handleChange}
                        />

                        <SelectField
                            label="Choose your profession..."
                            value={data.profession}
                            onChange={handleChange}
                            defaultOption="Choose..."
                            name="profession"
                            loading={isLoading}
                            options={professionList}
                            error={errors.profession}
                        />

                        <MultiSelectField
                            options={qualityList}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Choose your qualities..."
                            error={errors.qualities}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Update data
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <h2>Loading...</h2>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};
export default EditUserPage;
