import { useState } from "react";
import ReactQuill from "react-quill";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select a proper image");
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.error(error);
    }
  };
  return (
    <div className="mx-auto my-4 min-h-screen max-w-3xl rounded-md bg-stone-100 p-3 dark:bg-stone-800">
      <h1 className="my-7 text-center text-3xl font-semibold text-slate-700 dark:text-slate-300">
        Create a post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full flex-1 rounded-tl-md border-none placeholder-slate-300 focus:ring-slate-400 focus:ring-offset-2 dark:bg-stone-500"
          />
          <select
            name=""
            id=""
            className="cursor-pointer rounded-tr-md border-2 border-slate-300 hover:underline focus:border-none focus:ring-slate-400 focus:ring-offset-2 dark:border-stone-400 dark:bg-stone-500"
          >
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nextjs">NextJs</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-4 border-2 border-stone-300 p-3 dark:border-stone-400">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            className="cursor-pointer rounded-md bg-stone-200 hover:underline dark:bg-stone-500"
          />
          <button
            type="button"
            className="rounded-md border-stone-300 bg-stone-200 px-4 py-2 duration-300 hover:border-stone-400 hover:bg-stone-300 hover:underline dark:border-stone-400 dark:bg-stone-500 dark:hover:bg-stone-600"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="h-6 w-6">
                <CircularProgressbar
                  value={imageUploadProgress}
                  // text={`${imageUploadProgress || 0}%`}
                  strokeWidth={5}
                  styles={{
                    path: {
                      stroke: `rgba(89, 93, 106, ${imageUploadProgress / 100})`,
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {imageUploadError && (
          <p className="w-full bg-red-300 py-2 text-center text-red-800">
            {imageUploadError}
          </p>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="h-96 w-full object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-11 h-72"
          required
        />
        <button
          type="submit"
          className="w-full rounded-b-md bg-stone-400 py-3 font-semibold text-slate-800 duration-300 hover:bg-stone-700 hover:text-slate-300 hover:underline dark:hover:bg-stone-300 dark:hover:text-slate-900"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
