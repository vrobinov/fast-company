import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = (props) => {
    const { userId } = props;

    const [user, setUser] = useState();
    const [shifting, setShifting] = useState(true);

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
            setShifting(false);
        });
    }, []);

    const content = !user || shifting ? <h2>Loading</h2> : <View user={user} />;

    return <>{content}</>;
};

const View = ({ user }) => {
    const { name, profession, qualities, completedMeetings, rate } = user;
    const history = useHistory();
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Профессия:{profession.name}</p>
                    <p className="card-text">
                        {qualities.map((item) => (
                            <Qualities key={item._id} {...item} />
                        ))}
                    </p>
                    <p className="card-text">
                        Встретился, раз:{completedMeetings}
                    </p>
                    <p className="card-text">Оценка:{rate}</p>
                </div>
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                    history.replace("/users");
                }}
            >
                Все пользователи
            </button>
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

View.propTypes = {
    user: PropTypes.object
};

export default UserPage;
