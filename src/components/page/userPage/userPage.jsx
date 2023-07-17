import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/Comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = (props) => {
    const { userId } = props;
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const content = !user ? <h2>Loading</h2> : <View user={user} />;

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
