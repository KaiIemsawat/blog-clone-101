import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm font-semibold sm:text-xl dark:text-[#eaeae]"
      >
        <span className="rounded-lg bg-gradient-to-br from-rose-200 via-pink-400 to-purple-500 px-3 py-1 text-[#cfd1d3]">
          Zukkii's
        </span>{" "}
        blog
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
    </Navbar>
  );
};
export default Header;
