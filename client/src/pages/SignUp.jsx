import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("All fields are required");
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
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
                        <span className="text-stone-600">Blog</span>
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
                            <Label value="Username" />
                            <TextInput
                                type="text"
                                placeholder="YourUsername"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
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
                        <Button gradientDuoTone="purpleToPink" type="submit">
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex gap-2 text-2 mt-5">
                        <span>Have an account? </span>
                        <Link
                            to="/sign-in"
                            className="hover:text-blue-500 underline"
                        >
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
};
export default SignUp;
