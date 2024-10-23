import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleGoogleOauthClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ promp: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const date = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        nav("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      type="submit"
      onClick={handleGoogleOauthClick}
      className="flex w-full justify-center gap-2 rounded-md bg-stone-300 py-2 font-semibold text-slate-600 duration-300 hover:bg-stone-600 hover:text-slate-200 hover:underline"
    >
      <AiFillGoogleCircle className="h-6 w-6" />
      <span>Continue with Google</span>
    </button>
  );
}
