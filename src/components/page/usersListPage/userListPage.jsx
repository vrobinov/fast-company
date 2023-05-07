import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import api from "../../../api";
import PropTypes from "prop-types";
import { isEqual, orderBy } from "lodash";
import CroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import SearchPerson from "../../ui/searchPerson";

const UserListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [search, setSearch] = useState("");
    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const clearSearch = () => {
        setSearch("");
    };

    const handleDelete = (userId) => {
        const newUser = users.filter((u) => u._id !== userId);
        setUsers(newUser);
    };

    const hundleToggleBookmark = (id) => {
        const bookmark = users.map((mark) => {
            if (mark._id === id) {
                return { ...mark, bookmark: !mark.bookmark };
            }
            return mark;
        });
        setUsers(bookmark);
    };

    const handleProfessionsSelect = (item) => {
        clearSearch();
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => isEqual(user.profession, selectedProf))
            : users.filter((user) => user.name.includes(search));
        const count = filteredUsers.length;
        const sortedUsers = orderBy(
            filteredUsers,
            [sortBy.path, "name"],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf(null);
        };
        const handleSearch = (e) => {
            if (selectedProf) {
                clearFilter();
            }
            const value = e.target.value;
            setSearch(value);
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-schrink-0 p-3">
                        <CroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionsSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchPerson search={search} onSearch={handleSearch} />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={hundleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <h2>Loading...</h2>;
};

UserListPage.propTypes = {
    users: PropTypes.array
};

export default UserListPage;
