import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiLogout, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
    const location = useLocation();

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        setTab(tabFromUrl);
    }, [location.search]);
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label={"User"}
                            labelColor="dark"
                            as="div" // without this, browser will consider it as <a><a></a></a> which causes error
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiLogout} className="cursor-pointer">
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};
export default DashSidebar;
