import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState([]);
    const [shifting, setShifting] = useState(true);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
            setShifting(false);
        });
    }, []);

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
    return (
        <>
            {!shifting && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookmark={hundleToggleBookmark}
                    users={users}
                />
            )}
        </>
    );
};

export default App;
