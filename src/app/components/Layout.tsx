import React, { ReactNode } from "react";

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="font-kufi text-gray-800 min-h-screen">{children}</div>;
};

export default Layout;
