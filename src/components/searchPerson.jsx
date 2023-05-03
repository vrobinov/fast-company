import React from "react";
import PropTypes from "prop-types";

const SearchPerson = ({ search, onSearch }) => {
    return (
        <div className="mb-4">
            <input
                type="search"
                name="search"
                placeholder="Поиск..."
                value={search}
                onChange={onSearch}
                className="form-control w-100"
            />
        </div>
    );
};

SearchPerson.defaultProps = {
    search: ""
};

SearchPerson.propTypes = {
    search: PropTypes.string,
    onSearch: PropTypes.func.isRequired
};

export default SearchPerson;
