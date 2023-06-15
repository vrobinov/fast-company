import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage userId={userId} />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UserListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
