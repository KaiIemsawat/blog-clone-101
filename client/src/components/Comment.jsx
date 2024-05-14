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
    return <div>Comment</div>;
};
export default Comment;
