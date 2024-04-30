import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className="bg-[#faf7f5] text-slate-700 dark:text-stone-200 dark:bg-[#251f2e] min-h-screen">
                {children}
            </div>
        </div>
    );
};
export default ThemeProvider;
