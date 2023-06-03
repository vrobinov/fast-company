import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id !== id))
            );
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <CommentsList
                        comments={sortedComments}
                        onRemove={handleRemoveComment}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;
