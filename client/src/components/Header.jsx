import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

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
    <Navbar className="border-stone-200 bg-stone-100 dark:bg-stone-800 sm:py-8">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm font-semibold dark:text-[#eaeae] sm:text-xl"
      >
        <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 tracking-wider text-slate-300">
          Zukkii's
        </span>{" "}
        <span className="text-stone-500">blog</span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="h-10 w-12 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="hidden h-10 w-12 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold text-stone-600">
                @{currentUser.username}
              </span>
              <span className="block truncate text-sm font-medium text-stone-500">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link
              to={"/dashboard?tab=profile"}
              className="text-sm font-medium text-stone-500 hover:text-stone-800 hover:underline"
            >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : path === "/sign-in" ? (
          <Link to="/sign-up">
            <button className="rounded-md bg-stone-300 px-4 py-2 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline dark:bg-stone-600 dark:hover:bg-stone-500">
              <span className="font-semibold">Sign Up</span>
            </button>
          </Link>
        ) : (
          <Link to="/sign-in">
            <button className="rounded-md bg-stone-300 px-4 py-2 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline">
              <span className="font-semibold">Sign In</span>
            </button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active={path === "/"}
          as={"div"}
          className={
            path === "/"
              ? "rounded-md bg-stone-300 font-semibold text-slate-600 duration-300 hover:text-slate-800"
              : "rounded-md font-semibold text-slate-600 duration-300 hover:bg-stone-200 hover:text-slate-800"
          }
        >
          <Link
            to="/"
            className={
              path === "/"
                ? "font-semibold text-stone-800 duration-300 hover:text-black hover:underline"
                : "font-semibold text-stone-400 duration-300 hover:underline"
            }
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className={
            path === "/about"
              ? "rounded-md bg-stone-300 font-semibold text-slate-600 duration-300 hover:text-slate-800"
              : "rounded-md font-semibold text-slate-600 duration-300 hover:bg-stone-200 hover:text-slate-800"
          }
        >
          <Link
            to="/about"
            className={
              path === "/about"
                ? "font-semibold text-stone-800 duration-300 hover:text-black hover:underline"
                : "font-semibold text-stone-400 duration-300 hover:underline"
            }
          >
            Aboot
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/projects"}
          as={"div"}
          className={
            path === "/projects"
              ? "rounded-md bg-stone-300 font-semibold text-slate-600 duration-300 hover:text-slate-800"
              : "rounded-md font-semibold text-slate-600 duration-300 hover:bg-stone-200 hover:text-slate-800"
          }
        >
          <Link
            to="/projects"
            className={
              path === "/projects"
                ? "font-semibold text-stone-800 duration-300 hover:text-black hover:underline"
                : "font-semibold text-stone-400 duration-300 hover:underline"
            }
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
