import React, { useState } from "react";
import { MdLocalOffer, MdMenu } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const leftSideMenu = [
    { link: "/dashboard", text: "Dashboard", icon: <MdLocalOffer size={20} /> },
    {
      link: "/dashboard/offer",
      text: "Offer",
      icon: <MdLocalOffer size={20} />,
    },
    { link: "/dashboard/user", text: "User", icon: <MdLocalOffer size={20} /> },
  ];

  return (
    <div className="md:grid md:grid-cols-12 min-h-screen gap-4 ">
      <div className="m-4 flex justify-end md:hidden relative">
        <MdMenu
          size={24}
          className="cursor-pointer text-black hover:text-black/90"
          onClick={() => setIsVisible((prev) => !prev)}
        />
        {isVisible && (
          <div className="absolute top-full z-50">
            <ul className="bg-[#EDEEF3] py-4 px-2 overflow-auto">
              {leftSideMenu.map((obj, index) => (
                <NavLink
                  key={index}
                  to={obj.link}
                  onClick={() => setIsVisible(prev => !prev)}
                  className={` font-bold text-center py-2 cursor-pointer duration-300 flex items-center justify-start px-5 gap-4 ${
                    location.pathname === obj.link
                      ? "bg-white text-[#511BEA]"
                      : "hover:bg-white hover:text-[#511BEA]"
                  }`}
                >
                  <MdLocalOffer size={20} />
                  <span>{obj.text}</span>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul className="hidden md:block md:col-span-3 bg-[#EDEEF3] py-4 px-2 overflow-auto">
        {leftSideMenu.map((obj, index) => (
          <NavLink
            key={index}
            to={obj.link}
            className={` font-bold text-center py-2 cursor-pointer duration-300 flex items-center justify-start px-5 gap-4 ${
              location.pathname === obj.link
                ? "bg-white text-[#511BEA]"
                : "hover:bg-white hover:text-[#511BEA]"
            }`}
          >
            <MdLocalOffer size={20} />
            <span>{obj.text}</span>
          </NavLink>
        ))}
      </ul>

      {/* Grid second */}
      <div className="md:col-span-9 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
