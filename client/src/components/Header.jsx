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
                className="
                    self-center
                    whitespace-nowrap
                    text-sm
                    sm:text-xl
                    font-semibold
                    dark:text-stone-50
                "
            >
                <span
                    className="
                        px-2
                        py-1
                        bg-gradient-to-tr
                        from-purple-600 
                        via-pink-400
                        to-amber-100
                        text-stone-50
                        rounded-lg"
                >
                    Zukkii's
                </span>{" "}
                <span className="text-stone-600">Blog</span>
            </Link>
            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-12 h-10" color="gray">
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button
                    className="w-12 h-10 hidden sm:inline"
                    color="gray"
                    pill
                >
                    <FaMoon />
                </Button>
                <Link to="/sign-in">
                    <Button gradientDuoTone="purpleToPink">Sign In</Button>
                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Header;
