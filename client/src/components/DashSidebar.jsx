import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    HiDocumentText,
    HiLogout,
    HiOutlineUserGroup,
    HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        setTab(tabFromUrl);
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST",
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor="dark"
                            as="div" // without this, browser will consider it as <a><a></a></a> which causes error
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <>
                            <Link to="/dashboard?tab=posts">
                                <Sidebar.Item
                                    active={tab === "posts"}
                                    icon={HiDocumentText}
                                    as="div"
                                >
                                    Post
                                </Sidebar.Item>
                            </Link>
                            <Link to="/dashboard?tab=users">
                                <Sidebar.Item
                                    active={tab === "users"}
                                    icon={HiOutlineUserGroup}
                                    as="div"
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}
                    <Sidebar.Item
                        onClick={handleSignout}
                        icon={HiLogout}
                        className="cursor-pointer"
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};
export default DashSidebar;
