import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    HiAnnotation,
    HiArrowNarrowUp,
    HiDocumentText,
    HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComponents = () => {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user/getusers?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/post/getposts?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await fetch("/api/comment/getcomments?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);

    return (
        <div className="p-3 md:mx-auto">
            {/* Cards */}
            <div className="flex-wrap flex gap-4 justify-start xl:justify-center">
                <div className="flex flex-col p-3 bg-stone-100 dark:bg-slate-800 gap-4 md:w-full xl:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div className="">
                            <h3 className="text-stone-700 dark:text-stone-300 text-md uppercase">
                                Total Users
                            </h3>
                            <p className="text-2xl">{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className="bg-amber-500 text-5xl rounded-full p-3 text-stone-50 dark:text-stone-800" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-amber-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className="text-stone-700 dark:text-stone-300">
                            Last month
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-3 bg-stone-100 dark:bg-slate-800 gap-4 md:w-full xl:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div className="">
                            <h3 className="text-stone-700 dark:text-stone-300 text-md uppercase">
                                Total Comments
                            </h3>
                            <p className="text-2xl">{totalComments}</p>
                        </div>
                        <HiAnnotation className="bg-pink-500 text-5xl rounded-full p-3 text-stone-50 dark:text-stone-800" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-pink-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className="text-stone-700 dark:text-stone-300">
                            Last month
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-3 bg-stone-100 dark:bg-slate-800 gap-4 md:w-full xl:w-72 w-full rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div className="">
                            <h3 className="text-stone-700 dark:text-stone-300 text-md uppercase">
                                Total Posts
                            </h3>
                            <p className="text-2xl">{totalPosts}</p>
                        </div>
                        <HiDocumentText className="bg-lime-500 text-5xl rounded-full p-3 text-stone-50 dark:text-stone-800" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="text-lime-500 flex items-center">
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className="text-stone-700 dark:text-stone-300">
                            Last month
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="py-3 mx-auto justify-center flex flex-wrap gap-4">
                <div className="flex flex-col w-full md:w-full xl:w-72 shadow-md p-2 rounded-md bg-stone-100 dark:bg-stone-800">
                    <div className="flex p-3 text-sm items-center font-semibold justify-between">
                        <h1 className="text-center p-2">Recent Users</h1>
                        <Button outline gradientDuoTone="purpleToPink">
                            <Link to={"/dashboard?tab=users"}>See All</Link>
                        </Button>
                    </div>
                    <Table hoverable className="">
                        <Table.Head className="">
                            <Table.HeadCell>user Image</Table.HeadCell>
                            <Table.HeadCell>username</Table.HeadCell>
                        </Table.Head>
                        {users &&
                            users.map((user) => (
                                <Table.Body key={user._id} className="divide-y">
                                    <Table.Row className="bg-white dark:bg-stone-800 border-slate-300 dark:border-slate-700">
                                        <Table.Cell>
                                            <img
                                                src={user.profilePicture}
                                                alt="user"
                                                className="w-10 h-10 rounded-full bg-slate-500"
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p className="max-w-32 line-clamp-1 hover:line-clamp-3">
                                                {user.username}
                                            </p>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className="flex flex-col w-full md:w-full xl:w-72 shadow-md p-2 rounded-md bg-stone-100 dark:bg-stone-800">
                    <div className="flex p-3 text-sm items-center font-semibold justify-between">
                        <h1 className="text-center p-2">Recent Comments</h1>
                        <Button outline gradientDuoTone="purpleToPink">
                            <Link to={"/dashboard?tab=comments"}>See All</Link>
                        </Button>
                    </div>
                    <Table hoverable className="">
                        <Table.Head className="">
                            <Table.HeadCell>Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments &&
                            comments.map((comment) => (
                                <Table.Body
                                    key={comment._id}
                                    className="divide-y"
                                >
                                    <Table.Row className="bg-white dark:bg-stone-800 border-slate-300 dark:border-slate-700">
                                        <Table.Cell className="">
                                            <p className="max-w-32 line-clamp-1 hover:line-clamp-3">
                                                {comment.content}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {comment.numberOfLikes}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className="flex flex-col w-full md:w-full xl:w-72 shadow-md p-2 rounded-md bg-stone-100 dark:bg-stone-800">
                    <div className="flex p-3 text-sm items-center font-semibold justify-between">
                        <h1 className="text-center p-2">Recent Posts</h1>
                        <Button outline gradientDuoTone="purpleToPink">
                            <Link to={"/dashboard?tab=posts"}>See All</Link>
                        </Button>
                    </div>
                    <Table hoverable className="">
                        <Table.Head className="">
                            {/* <Table.HeadCell>Post Image</Table.HeadCell> */}
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts &&
                            posts.map((post) => (
                                <Table.Body key={post._id} className="divide-y">
                                    <Table.Row className="bg-white dark:bg-stone-800 border-slate-300 dark:border-slate-700">
                                        {/* <Table.Cell>
                                            <img
                                                src={post.image}
                                                alt="user"
                                                className="w-14 h-10 rounded-md bg-slate-500"
                                            />
                                        </Table.Cell> */}
                                        <Table.Cell>
                                            <p className="max-w-32 line-clamp-1 hover:line-clamp-3">
                                                {post.title}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>{post.category}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default DashboardComponents;
