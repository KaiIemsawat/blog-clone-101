import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    return post ? (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto font-serif lg:text-4xl">
                {post.title}
            </h1>
            <Link
                to={`/searchk?category=${post.category}`}
                className="self-center mt-5"
            >
                <Button color="gray" pill size="xs">
                    {post.category}
                </Button>
            </Link>
            <img
                src={post.image}
                alt={post.title}
                className="mt-10 p-3 m-h-[600px] w-full object-cover"
            />
            <div className="flex justify-between p-3 border-b border-slate-500 w-full mx-auto text-xs font-thin text-stone-700 dark:text-stone-300">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{(post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div
                className="p-3 w-full mt-4 post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
        </main>
    ) : (
        <div>No post found</div>
    );
};
export default PostPage;
