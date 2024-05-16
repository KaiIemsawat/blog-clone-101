import { Button, Textarea } from "flowbite-react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

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

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                {isEditing ? (
                    <>
                        <Textarea
                            className="mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                            <Button
                                type="button"
                                size="sm"
                                gradientDuoTone="purpleToBlue"
                                outline
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                gradientDuoTone="pinkToOrange"
                                outline
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
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
                        border-t-2
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
                                className={`text-stone-400 dark:text-stone-600 hover:text-blue-300 dark:hover:text-blue-300 duration-300 ${
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
                            {currentUser &&
                                (currentUser._id === comment.userId ||
                                    currentUser.isAdmin) && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleEdit}
                                            className="text-stone-400 dark:text-stone-600 hover:text-amber-500 dark:hover:text-amber-500 duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete(comment._id)
                                            }
                                            className="text-stone-400 dark:text-stone-600 hover:text-red-500 dark:hover:text-red-500 duration-300"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default Comment;
