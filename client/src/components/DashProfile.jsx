import { Button, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file)); // set temporary file url
        }
    };
    // console.log(imageFile);
    console.log(imageFileUrl);

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    onClick={() => filePickerRef.current.click()}
                    className="w-32 h-32 self-center cursor-pointer shadow-md hover:shadow-xl duration-700 rounded-full "
                >
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user profile"
                        className="
                            rounded-full
                            w-full
                            h-full
                            border-8
                            object-cover
                            border-slate-300 hover:border-slate-400
                            duration-700
                            dark:border-pink-100 hover:dark:border-pink-400
                        "
                    />
                </div>
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="*******"
                />
                <Button type="submit" gradientDuoTone="purpleToPink" outline>
                    Update
                </Button>
            </form>
            <div className="text-slate-500 flex justify-between mt-5">
                <span className="cursor-pointer hover:text-red-500 hover:underline duration-300">
                    Delete Account
                </span>
                <span className="cursor-pointer hover:text-amber-500 hover:underline duration-300">
                    Sign Out
                </span>
            </div>
        </div>
    );
};
export default DashProfile;
