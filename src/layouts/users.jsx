import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const Users = () => {
    const { userId, edit } = useParams();
    return userId ? (
        edit ? (
            <EditUserPage userId={userId} />
        ) : (
            <UserPage userId={userId} />
        )
    ) : (
        <UserListPage />
    );
};

export default Users;
