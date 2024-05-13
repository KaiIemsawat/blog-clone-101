import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
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
            ) : (
                <div>
                    <span>You must sign in to comment</span>
                    <Link to={"/sign-in"}>Sign in</Link>
                </div>
            )}
        </div>
    );
};
export default CommentSection;
