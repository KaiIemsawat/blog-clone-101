import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div
            className="
                m-4
                group
                relative
                w-full
                border
                border-slate-300
                dark:border-slate-700
                rounded-lg
                h-[300px]
                sm:h-[310px]
                md:h-[380px]
                overflow-hidden
                sm:w-[430px]
                hover:bg-orange-50
                dark:hover:bg-[#22183a]
                duration-300
                transition-all
            "
        >
            <Link to={`/post/${post.slug}`} className="relative">
                <img
                    src={post.image}
                    alt="post cover image"
                    className="
                        h-[180px]
                        md:h-[260px]
                        rounded-t-lg
                        w-full
                        object-cover
                        transition-all
                        duration-300
                        z-20
                    "
                />
            </Link>
            <div className="p-3 flex flex-col">
                <p className="text-xl font-semibold line-clamp-1">
                    {post.title}
                </p>
                <span className="font-thin text-stone-600 dark:text-stone-400">
                    {post.category}
                </span>
                <Link
                    to={`/post/${post.slug}`}
                    className="
                        z-10
                        text-sm
                        group-hover:bottom-0
                        absolute
                        bottom-[-200px]
                        left-0
                        right-0
                        bg-amber-500
                        text-stone-100
                        hover:underline
                        transition-all
                        duration-500
                        text-center
                        py-2
                        rounded-b-md
                        m-2
                    "
                >
                    Read article
                </Link>
            </div>
        </div>
    );
};
export default PostCard;
