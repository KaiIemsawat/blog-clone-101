import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 p-3 md:flex-row">
        {/* LEFT */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-semibold dark:text-[#eaeae]"
          >
            <span className="rounded-lg bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-500 px-2 py-1 text-white">
              Zukkii's
            </span>
            <span className="text-stone-600">blog</span>
          </Link>
          <p className="mt-5 text-sm font-light text-stone-600 dark:text-stone-100">
            This is my demo project using MERN stack, styling with TailwindCSS.
            Users may create an account or using their Google acount.
          </p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Username.." id="username" />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="email" placeholder="Email....." id="email" />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password.."
                id="password"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" outline type="submit">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 flex justify-center gap-2 font-light text-stone-800">
            <span>Have an account? </span>
            <Link to="/sign-in" className="font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
