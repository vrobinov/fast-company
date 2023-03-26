import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    const getClasses = () => {
        let classes = "bi bi-bookmark";
        return (classes += status ? "-fill" : "");
    };
    return (
        <button {...rest}>
            <i className={getClasses()}></i>
        </button>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool
};

export default Bookmark;
