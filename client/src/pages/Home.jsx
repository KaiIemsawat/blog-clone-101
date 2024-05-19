import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const Home = () => {
    return (
        <div>
            <div className="flex flex-col gap-6 p-28  px-8 max-w-6xl mx-auto ">
                <h1 className="text-3xl font-semibold lg:text-6xl text-slate-800 dark:text-stone-300">
                    Welcome to my blog
                </h1>
                <p className="text-slate-600 dark:text-stone-400 text-xs sm:text-sm">
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                </p>
                <Link
                    to="/search"
                    className="text-xs sm:text-sm text-amber-500 hover:underline hover:text-blue-600 font-semibold duration-300"
                >
                    View all posts
                </Link>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700">
                <CallToAction />
            </div>
        </div>
    );
};
export default Home;
