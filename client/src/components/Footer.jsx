import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <Footer container className="border-t-8 border-teal-500">
            <div>
                <div>
                    <div>
                        <Link
                            to="/"
                            className="
                                self-center
                                whitespace-nowrap
                                text-lg
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
                                    rounded-lg
                                "
                            >
                                Zukkii's
                            </span>{" "}
                            <span className="text-stone-600">Blog</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://kai-portfolio.tech/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Portfolio
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow Us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://github.com/KaiIemsawat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </Footer.Link>
                                <Footer.Link
                                    href="https://www.linkedin.com/in/kaiiemsawat/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    );
};
export default FooterComponent;
