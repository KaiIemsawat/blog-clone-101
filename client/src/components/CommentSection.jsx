import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Comment from "./Comment";

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState(null);

    console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 600) {
            return;
        }
        try {
            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment("");
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(
                    `/api/comment/getPostComments/${postId}`
                );
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    return (
        <div className="max-w-2xl w-full mx-auto flex flex-col p-3">
            {currentUser ? (
                <>
                    <div className="flex items-center gap-1 my-5 text-slate-500 text-sm font-thin">
                        <p>Signed in as : </p>
                        <img
                            className="h-5 w-5 object-cover rounded-full"
                            src={currentUser.profilePicture}
                            alt="user profile image"
                        />
                        <Link
                            to={"/dashboard?tab=profile"}
                            className="text-xs font-semibold text-amber-500 hover:underline"
                        >
                            @{currentUser.username}
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="border border-blue-600 dark:border-blue-400 rounded-md p-3"
                    >
                        <Textarea
                            placeholder="Add your comment..."
                            rows="3"
                            cols="200"
                            maxLength="600"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <div className="flex justify-between items-center mt-5">
                            <p className="text-stone-500 dark:text-stone-400 text-sm">
                                {comment.length >= 599
                                    ? `${
                                          600 - comment.length
                                      } character remaining`
                                    : `${
                                          600 - comment.length
                                      } characters remaining`}
                            </p>
                            <Button
                                outline
                                gradientDuoTone="purpleToBlue"
                                type="submit"
                            >
                                Submit comment
                            </Button>
                        </div>
                        {commentError && (
                            <Alert
                                color="failure"
                                className="mt-5 items-center"
                            >
                                {commentError}
                            </Alert>
                        )}
                    </form>
                </>
            ) : (
                <div className="my-5 flex gap-1 text-sm">
                    <span className="text-stone-500">
                        You must sign in to comment
                    </span>
                    <Link
                        to={"/sign-in"}
                        className="text-blue-500 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5 text-stone-500">
                    No comment for this post yet
                </p>
            ) : (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p className="text-stone-600 dark:text-stone-200">
                            Comments
                        </p>
                        <div className="bg-slate-200 dark:bg-slate-600 px-1 rounded-md">
                            <p className="text-stone-500 dark:text-stone-300 font-semibold">
                                {comments.length}
                            </p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </>
            )}
        </div>
    );
};
export default CommentSection;
