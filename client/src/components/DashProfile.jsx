import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    getStorage,
    uploadBytesResumable,
    ref,
    getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";

import { app } from "../firebase";
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file)); // set temporary file url
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        /* -- Firebase Storage setup -- */
        /*
        service firebase.storage {
            match /b/{bucket}/o {
                match /{allPaths=**} {
                allow read;
                allow write: if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*')
                }
            }
        }
        */
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    "Could not upload image (File must be smaller than 2MB)"
                );
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    console.log(formData);

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            return;
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(updateFailure(data.message));
            } else {
                dispatch(updateSuccess(data));
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form onSubmit={handelSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    onClick={() => filePickerRef.current.click()}
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md hover:shadow-xl duration-700 rounded-full "
                >
                    {imageFileUploadingProgress && (
                        <CircularProgressbar
                            value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${
                                        imageFileUploadingProgress / 100
                                    })`,
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user profile"
                        className={`
                            rounded-full
                            w-full
                            h-full
                            border-8
                            object-cover
                            border-slate-300 hover:border-slate-400
                            duration-700
                            dark:border-pink-100 hover:dark:border-pink-400
                            ${
                                imageFileUploadingProgress &&
                                imageFileUploadingProgress < 100 &&
                                "opacity-60"
                            }
                        `}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color="failure" className="items-center">
                        {imageFileUploadError}
                    </Alert>
                )}
                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="*******"
                    onChange={handleChange}
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
