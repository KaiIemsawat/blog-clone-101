import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const { loading, error: errorMessage } = useSelector((state) => state.user);

  // const dispatch = useDispatch();
  const nav = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required..!");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      // dispatch(signInStart());

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        // dispatch(signInSuccess(data));
        nav("/");
      } else if (!data.success) {
        setLoading(false);
        return setErrorMessage(data.message);
        // dispatch(signInFailure(data.message));
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      // dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg bg-stone-100 p-12 dark:bg-stone-800 md:flex-row">
        {/* LEFT */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-semibold dark:text-[#eaeae]"
          >
            <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 tracking-wider text-slate-300">
              Zukkii's
            </span>
            <span className="text-stone-500">blog</span>
          </Link>
          <p className="mt-5 text-sm font-light text-stone-600 dark:text-stone-400">
            This is my demo project using MERN stack, styling with TailwindCSS.
            Users may create an account or using their Google acount.
          </p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label className="dark:text-slate-300" value="Username" />
              <input
                type="text"
                placeholder="YourUsername"
                id="username"
                onChange={onChange}
                className="w-full rounded-md border-none border-slate-300 placeholder-slate-300 focus:ring-slate-400 focus:ring-offset-2"
              />
            </div>
            <div>
              <Label className="dark:text-slate-300" value="Email" />
              <input
                type="email"
                placeholder="your@email.com"
                id="email"
                onChange={onChange}
                className="w-full rounded-md border-none border-slate-300 placeholder-slate-300 focus:ring-slate-400 focus:ring-offset-2"
              />
            </div>
            <div>
              <Label className="dark:text-slate-300" value="Password" />
              <input
                type="password"
                placeholder="******"
                id="password"
                onChange={onChange}
                className="w-full rounded-md border-none border-slate-300 placeholder-slate-300 focus:ring-slate-400 focus:ring-offset-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-stone-300 py-2 text-slate-600 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                <span className="font-semibold">Sign Up</span>
              )}
            </button>
          </form>
          <OAuth />
          <div className="mt-4 flex justify-center gap-2 font-light text-stone-800 dark:text-stone-400">
            <span>Have an account? </span>
            <Link
              to="/sign-in"
              className="font-semibold hover:underline dark:text-stone-300"
            >
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <p className="mt-5 w-full rounded-md bg-red-300 py-2 text-center text-red-800">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
