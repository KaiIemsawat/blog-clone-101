import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(
                    `/api/post/getposts?userId=${currentUser._id}`
                );
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div
            className="
                table-auto
                overflow-x-scroll
                md:mx-auto p-3 scrollbar
                scrollbar-track-stone-400
                scrollbar-thumb-stone-500
                dark:scrollbar-track-stone-700
                dark:scrollbar-thumb-stone-900
            "
        >
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Date Update</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body key={post.slug} className="divide-y">
                                <Table.Row className="bg-stone-200 dark:bg-stone-800">
                                    <Table.Cell>
                                        {new Date(
                                            post.updatedAt
                                        ).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-20 h-10 object-cover bg-slate-500"
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={`/post/${post.slug}`}
                                            className="font-medium text-slate-800 hover:text-slate-600 dark:text-slate-50 dark:hover:text-slate-300 hover:underline duration-300"
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                            className="text-red-500 hover:text-red-300 dark:hover:text-red-700 duration-300 hover:underline cursor-pointer font-semibold"
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className="text-amber-500 hover:text-amber-300 duration-300 hover:underline cursor-pointer font-semibold"
                                            to={`/update-post/${post._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="w-full rounded-lg text-stone-700 dark:text-stone-50 self-center text-sm py-2 font-semibold"
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : (
                <p>There is no post...</p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-slate-500 dark:text-slate-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-slate-500 dark:text-slate-200">
                            Confirm deleting the post
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeletePost}>
                                Yes, delete the account
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default DashPosts;
