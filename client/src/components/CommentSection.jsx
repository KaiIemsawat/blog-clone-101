import { Button, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {};

    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center p-3">
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
        </div>
    );
};
export default CommentSection;
