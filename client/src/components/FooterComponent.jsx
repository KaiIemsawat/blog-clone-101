import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsGithub, BsTwitterX } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="bg-stone-100 px-12 shadow-none">
      <div className="mx-auto w-full max-w-7xl">
        <div className="justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm font-semibold sm:text-xl dark:text-[#eaeae]"
            >
              <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 text-white">
                Zukkii's
              </span>{" "}
              <span className="text-stone-500">blog</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="my-6 sm:my-0">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.kai-portfolio.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="https://www.github.com/KaiIemsawat"
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
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    (window.location.href = "mailto:kaiiemsawat@gmail.com"),
                      e.preventDefault();
                  }}
                >
                  Contact Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="my-6 sm:my-0">
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  placeholder
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  placeholder
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  placeholder
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="my-6 sm:my-0">
              <Footer.Title title="Learn more" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  placeholder
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div className="flex justify-between gap-3 sm:flex-row">
          <Footer.Copyright
            href="#"
            by="KaiIemsawat"
            year={new Date().getFullYear()}
            onClick={(e) => {
              (window.location.href = "mailto:kaiiemsawat@gmail.com"),
                e.preventDefault();
            }}
          />
          <div className="flex justify-center gap-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
