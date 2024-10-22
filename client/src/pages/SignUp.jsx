import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        nav("/sign-in");
      } else if (!data.success) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            <span className="rounded-lg bg-gradient-to-tr from-stone-600 via-gray-500 to-slate-400 px-2 py-1 text-white">
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
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="YourUsername"
                id="username"
                onChange={onChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="your@email.com"
                id="email"
                onChange={onChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={onChange}
              />
            </div>
            <Button color="gray" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                <span className="font-semibold text-slate-400 hover:text-slate-800 hover:underline">
                  Sign Up
                </span>
              )}
            </Button>
          </form>
          <div className="mt-4 flex justify-center gap-2 font-light text-stone-800">
            <span>Have an account? </span>
            <Link to="/sign-in" className="font-semibold hover:underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 items-center" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
