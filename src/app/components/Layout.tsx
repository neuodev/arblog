import React, { ReactNode } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="font-kufi text-gray-800 min-h-screen dark:bg-slate-800 dark:text-slate-500">
      <ThemeSwitcher />
      {children}
    </div>
  );
};

export default Layout;
