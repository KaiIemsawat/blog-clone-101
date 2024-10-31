import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
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
            type="file"
            accept="image/*"
            className="cursor-pointer rounded-md bg-stone-200 dark:bg-stone-500"
          />
          <button
            type="button"
            className="rounded-md border-2 border-stone-300 bg-stone-200 px-4 py-2 duration-300 hover:border-stone-400 hover:bg-stone-300 hover:underline dark:border-stone-400 dark:bg-stone-500 dark:hover:bg-stone-600"
          >
            Upload Image
          </button>
        </div>
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
