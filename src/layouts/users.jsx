import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UserList from "../components/userList";

const Users = () => {
    const { userId } = useParams();
    return userId ? <UserPage userId={userId} /> : <UserList />;
};

export default Users;
