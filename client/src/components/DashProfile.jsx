import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    /* service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read;
          allow write: if
          request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.matches('image/.*')
        }
      }
    } */
    setImageFileUploadError(null);
    const storage = getStorage(app); // app comes from Firebase.js
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
          "Could not upload image ('File might be to large')",
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* FILE INPUT / PROFILE IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "%100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(89, 93, 106, ${imageFileUploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User Profile"
            className={`h-full w-full rounded-full border-4 border-slate-300 object-cover dark:border-stone-400 ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && "opacity-60"}`}
          />
        </div>

        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-slate-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-slate-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <input
          type="password"
          id="password"
          placeholder="******"
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-stone-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <button
          className="w-full rounded-md bg-stone-300 py-2 text-slate-600 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline"
          type="submit"
        >
          Update
        </button>
      </form>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <span className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-amber-600 hover:underline hover:ring-2 hover:ring-amber-500">
          Sign Out
        </span>
        <span className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-red-700 hover:underline hover:ring-2 hover:ring-red-500">
          Delete Account
        </span>
      </div>
      {imageFileUploadError && (
        <p className="mt-3 w-full rounded-md border border-red-800 bg-red-300 py-2 text-center text-red-800">
          {imageFileUploadError}
        </p>
      )}
    </div>
  );
}
