import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
    const [formData, setFormData] = useState({});

    const { loading, error: errorMessage } = useSelector((state) => state.user); // useSelect will look into global state for the name of "user"
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure("All fields are requireded"));
        }

        try {
            dispatch(signInStart());

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* LEFT SIDE */}
                <div className="flex-1">
                    <Link
                        to="/"
                        className="
                            text-4xl
                            font-bold
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
                        <span className="text-stone-600 dark:text-stone-200">
                            Blog
                        </span>
                    </Link>
                    <p className="text-sm mt-5">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                {/* RIGHT SIDE */}
                <div className="flex-1">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <Label value="Email" />
                            <TextInput
                                type="email"
                                placeholder="your.email@address.com"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Password" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone="purpleToPink"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size="sm" />{" "}
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-2 mt-5">
                        <span>Already have an account? </span>
                        <Link
                            to="/sign-up"
                            className="hover:text-blue-500 underline"
                        >
                            Sign Up
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
};
export default SignIn;
