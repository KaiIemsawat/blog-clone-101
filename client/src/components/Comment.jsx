import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
    const [user, setUser] = useState({});

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`/api/user/${comment.userId}`);
            const data = await res.json();

            if (res.ok) {
                setUser(data);
            }
            try {
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [comment]);

    return (
        <div className="flex p-4 border-b border-stone-300 dark:border-stone-700 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img
                    src={user.profilePicture}
                    alt={`${user.username} profile image`}
                    className="w-10 h-10 rounded-full bg-slate-200"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-end mb-1">
                    <span className="font-bold mr-1 truncate">
                        {user ? `@${user.username}` : "anonymous user"}
                    </span>
                    <span className="font-thin dark:text-stone-300 text-stone-900">
                        {`| ${moment(comment.createdAt).fromNow()}`}
                    </span>
                </div>
                <p className="text-stone-600 dark:text-stone-400 pb-2">
                    {comment.content}
                </p>
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        pt-2
                        mt-2
                        text-xs
                        border-t-4
                        border-stone-200
                        dark:border-stone-700
                        border-dotted
                        max-w-[128px]
                    "
                    // Note : edit max-w-[128px] later
                >
                    <button
                        type="button"
                        onClick={() => onLike(comment._id)}
                        className={`text-stone-400 dark:text-stone-600 hover:text-blue-300 duration-300 ${
                            currentUser &&
                            comment.likes.includes(currentUser._id) &&
                            "!text-blue-500"
                        }`}
                    >
                        <FaThumbsUp className="text-xs" />
                    </button>
                    <p className="text-stone-600 dark:text-stone-400">
                        {comment.numberOfLikes > 0 &&
                            comment.numberOfLikes +
                                " " +
                                (comment.numberOfLikes === 1
                                    ? "like"
                                    : "likes")}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Comment;
