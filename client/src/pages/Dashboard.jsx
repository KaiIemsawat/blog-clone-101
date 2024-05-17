import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

import DashUsers from "../components/DashUsers";
import DashPosts from "../components/DashPosts";
import DashComments from "../components/DashComments";

const Dashboard = () => {
    const location = useLocation();

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        setTab(tabFromUrl);
    }, [location.search]);
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                {/* SIDE BAR */}
                <DashSidebar />
            </div>
            {/* PROFILE */}
            {tab === "profile" && <DashProfile />}
            {/* POST */}
            {tab === "posts" && <DashPosts />}
            {/* USER */}
            {tab === "users" && <DashUsers />}
            {/* COMMENTS */}
            {tab === "comments" && <DashComments />}
        </div>
    );
};
export default Dashboard;
