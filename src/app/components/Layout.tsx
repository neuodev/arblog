import React, { ReactNode } from "react";

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="font-kufi bg-dark text-gray-100 min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
