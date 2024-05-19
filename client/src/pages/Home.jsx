import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/post/getposts");
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);
    return (
        <div>
            <div className="flex flex-col gap-6 p-28  px-8 max-w-6xl mx-auto ">
                <h1 className="text-3xl font-semibold lg:text-6xl text-slate-800 dark:text-stone-300">
                    Welcome to my blog
                </h1>
                <p className="text-slate-600 dark:text-stone-400 text-xs sm:text-sm">
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                </p>
                <Link
                    to="/search"
                    className="text-xs sm:text-sm text-amber-500 hover:underline hover:text-blue-600 font-semibold duration-300"
                >
                    View all posts
                </Link>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700">
                <CallToAction />
            </div>
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
                {posts && posts.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-700 dark:text-stone-300">
                            Recent Posts
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to="/search"
                            className="text-xs sm:text-sm text-amber-500 hover:underline hover:text-blue-600 font-semibold duration-300 text-center sm:text-end sm:pe-4"
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Home;
