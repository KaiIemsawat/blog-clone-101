import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const nav = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required.."));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); // 'data' refered to 'action.payload' in userSlice.js
        nav("/");
      } else if (!data.success) {
        dispatch(signInFailure(data.message)); // 'data.message' refered to 'action.payload' in userSlice.js
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="mt-20 min-h-screen">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg bg-stone-100 p-12 md:flex-row dark:bg-stone-800">
        {/* LEFT */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center text-4xl font-semibold dark:text-[#eaeae]"
          >
            <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 tracking-wider text-white">
              Zukkii's
            </span>
            <span className="text-stone-500">blog</span>
          </Link>
          <p className="mt-5 text-sm font-light text-stone-600 dark:text-stone-100">
            This is my demo project using MERN stack, styling with TailwindCSS.
            Users may create an account or using their Google acount.
          </p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <input
                type="email"
                placeholder="your@email.com"
                id="email"
                onChange={onChange}
                className="w-full rounded-md border-none border-slate-300 placeholder-slate-300 focus:ring-slate-400 focus:ring-offset-2"
              />
            </div>
            <div>
              <Label value="Password" />
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
              className="w-full rounded-md bg-stone-300 py-2 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                <span className="font-semibold">Sign In</span>
              )}
            </button>
          </form>
          <div className="mt-4 flex justify-center gap-2 font-light text-stone-800">
            <span>Need an account? </span>
            <Link to="/sign-up" className="font-semibold hover:underline">
              Sign Up
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
