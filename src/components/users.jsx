import React, { useState } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th className="m-2">Имя</th>
                            <th className="m-2">Качества</th>
                            <th className="m-2">Проффессия</th>
                            <th className="m-2">Встретился, раз</th>
                            <th className="m-2">Оценка</th>
                            <th className="m-2">Избранное</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
