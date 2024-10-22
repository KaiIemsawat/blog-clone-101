import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm font-semibold sm:text-xl dark:text-[#eaeae]"
      >
        <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 tracking-wider text-white">
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
        <Button className="hidden h-10 w-12 sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        {path === "/sign-in" ? (
          <Link to="/sign-up">
            <button className="rounded-md bg-stone-300 px-4 py-2 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline">
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
