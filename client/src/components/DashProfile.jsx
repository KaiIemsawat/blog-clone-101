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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserrFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import "react-circular-progressbar/dist/styles.css";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();

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
    setImageFileUploading(true);
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
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileUploading(false);
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No change made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to finish uploading");
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
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserrFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserrFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              text={
                imageFileUploadingProgress > 0 &&
                imageFileUploadingProgress < 100 &&
                `${imageFileUploadingProgress}%`
              }
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
          onChange={handleChange}
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-slate-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-slate-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <input
          type="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
          className="w-full rounded-md border-none border-slate-300 bg-stone-100 py-2 placeholder-stone-300 ring-1 ring-stone-200 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-700 dark:placeholder-stone-500 dark:ring-stone-500"
        />
        <button
          className="w-full rounded-md bg-stone-300 py-2 text-slate-600 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline"
          type="submit"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      {currentUser.isAdmin && (
        <Link to={"/create-post"}>
          <button
            className="mt-3 w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-indigo-600 hover:underline hover:ring-2 hover:ring-indigo-500"
            type="button"
          >
            Create Post
          </button>
        </Link>
      )}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <span
          onClick={handleSignout}
          className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-amber-600 hover:underline hover:ring-2 hover:ring-amber-500"
        >
          Sign Out
        </span>
        <span
          onClick={() => setShowModal(true)}
          className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-red-700 hover:underline hover:ring-2 hover:ring-red-500"
        >
          Delete Account
        </span>
      </div>

      {/* MESSAGES */}
      {imageFileUploadError && (
        <p className="mt-3 w-full rounded-md border border-red-800 bg-red-300 py-2 text-center text-red-800">
          {imageFileUploadError}
        </p>
      )}
      {updateUserError && (
        <p className="mt-3 w-full rounded-md border border-red-800 bg-red-300 py-2 text-center text-red-800">
          {updateUserError}
        </p>
      )}
      {error && (
        <p className="mt-3 w-full rounded-md border border-red-800 bg-red-300 py-2 text-center text-red-800">
          {error}
        </p>
      )}
      {updateUserSuccess && (
        <p className="mt-3 w-full rounded-md border border-green-400 bg-green-300 py-2 text-center text-green-600">
          {updateUserSuccess}
        </p>
      )}

      {/* MODAL */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-slate-400" />
            <h3 className="mb-5 text-lg text-amber-600">
              Deleting account confirmation
            </h3>
            <div className="mb-4 flex gap-3">
              <button
                onClick={handleDeleteUser}
                className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-red-700 hover:underline hover:ring-2 hover:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full cursor-pointer rounded-md bg-stone-200 py-2 text-center text-slate-400 duration-300 hover:text-amber-600 hover:underline hover:ring-2 hover:ring-amber-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
