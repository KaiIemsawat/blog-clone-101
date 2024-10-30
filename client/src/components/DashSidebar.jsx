import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab"); // get value from query params of ->'tab'
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
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
      console.error(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              label={"User"}
              as="div"
              labelColor="dark"
              icon={HiUser}
              className={`${tab === "profile" && "bg-slate-300 text-stone-700 dark:bg-slate-500"} duration-300 hover:ring-2 hover:ring-slate-400`}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            active
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className="cursor-pointer hover:bg-amber-600 hover:text-slate-200 hover:underline dark:hover:bg-amber-600"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
