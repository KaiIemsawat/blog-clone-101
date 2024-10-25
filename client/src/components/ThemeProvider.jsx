import { useSelector } from "react-redux";

export const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-stone-50 text-slate-700 dark:bg-stone-900 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
};
