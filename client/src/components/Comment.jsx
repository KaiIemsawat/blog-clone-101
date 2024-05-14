import moment from "moment/moment";
import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
    const [user, setUser] = useState({});

    console.log(user);
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
        <div>
            <div className="">
                <img
                    src={user.profilePicture}
                    alt={`${user.username} profile image`}
                    className="w-10 h-10 rounded-full bg-slate-200"
                />
            </div>
            <div className="">
                <div>
                    <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.username}` : "anonymous user"}
                    </span>
                    <span>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    );
};
export default Comment;
