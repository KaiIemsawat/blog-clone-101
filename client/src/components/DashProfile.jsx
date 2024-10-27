import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md">
          <img
            src={currentUser.profilePicture}
            alt="User Profile"
            className="h-full w-full rounded-full border-8 border-slate-300 object-cover"
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
      </form>
    </div>
  );
}
