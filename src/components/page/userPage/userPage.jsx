import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/Comments";

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
    return (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
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
