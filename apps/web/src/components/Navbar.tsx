import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1 className="cursor-pointer text-xl font-bold">Logo</h1>

          <div className="flex cursor-pointer items-center gap-8 font-medium">
            <h3>Home</h3>
            <h3>Write</h3>
            <h3>Profile</h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
