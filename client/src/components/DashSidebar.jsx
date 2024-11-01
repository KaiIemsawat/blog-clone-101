import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
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
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              label={currentUser.isAdmin ? "Admin" : "User"}
              as="div"
              labelColor="dark"
              icon={HiUser}
              className={`${tab === "profile" ? "border-2 border-stone-500 bg-slate-300 font-semibold text-stone-700 dark:border-stone-400 dark:bg-slate-500 dark:text-stone-300" : "bg-slate-200 dark:bg-slate-600"} duration-300 hover:underline hover:ring-2 hover:ring-slate-400`}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                icon={HiDocumentText}
                as="div"
                className={`${tab === "posts" ? "border-2 border-stone-500 bg-slate-300 font-semibold text-stone-700 dark:border-stone-400 dark:bg-slate-500 dark:text-stone-300" : "bg-slate-200 dark:bg-slate-600"} duration-300 hover:underline hover:ring-2 hover:ring-slate-400`}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            active
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className="cursor-pointer duration-300 hover:border hover:border-amber-600 hover:text-slate-700 hover:underline dark:hover:border dark:hover:border-amber-600"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
