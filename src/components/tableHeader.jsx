import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [activeHeader, setActiveHeader] = useState({
        name: "name",
        order: "asc"
    });

    useEffect(() => {
        setActiveHeader({ name: selectedSort.path, order: selectedSort.order });
    }, [selectedSort]);

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderArrow = (item) => {
        if (item.path === activeHeader.name) {
            return activeHeader.order === "asc"
                ? (
                    <span>
                        {item.name} <i className="bi bi-caret-up-fill"></i>
                    </span>
                )
                : (
                    <span>
                        {item.name} <i className="bi bi-caret-down-fill"></i>
                    </span>
                );
        }
        return <span>{item.name}</span>;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined} {...{ role: columns[column].path && "button" }}
                        className="m-2">
                        {renderArrow(columns[column])}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
