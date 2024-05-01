import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
    const location = useLocation();

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        setTab(tabFromUrl);
    }, [location.search]);
    return (
        <div>
            {/* SIDE BAR */}
            <DashSidebar />
            {/* PROFILE */}
            {tab === "profile" && <DashProfile />}
        </div>
    );
};
export default Dashboard;
