'use client'
import React, {useState} from 'react'
import { MdMenu, MdClose } from "react-icons/md";
import { LuSearch } from "react-icons/lu";


interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <header className="flex items-center justify-between relative p-4 pl-7 py-5 bg-white shadow-lg w-full">
      {/* Logo */}
      <img
        src="/image/Lend_logo.svg"
        alt="logo"
        className="w-[115.37px] py-3"
      />

      {/* Mobile Menu Icon */}
      <div
        className="absolute right-4 top-8 block lg:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <MdClose size={24} />
        ) : (
          <MdMenu className="text-2xl cursor-pointer text-black" />
        )}
      </div>

      {/* Main Content Section */}
      <div className="flex flex-row justify-end items-center xl:gap-80 lg:gap-20 w-full pr-10">
        {/* Search Bar on large screen */}
        <div className="relative w-full md:w-[400px] lg:flex hidden">
          <span className="search-blue px-5 py-[13px] absolute top-1/2 right-0 rounded-r-[14px] transform -translate-y-1/2 cursor-pointer">
            <LuSearch color="white" />
          </span>
          <input
            type="text"
            className="text-custom-blue border outline-none w-full p-2 rounded-2xl font-work placeholder:ml-3 placeholder:font-normal placeholder:text-[14px] placeholder:text-custon-lightBlue"
            placeholder="Search for anything"
          />
        </div>
        {/* Search Bar on mobile screen */}
        <div className="relative w-full md:w-[400px] lg:hidden flex items-center">
          <span
            className={`px-5 py-3 absolute top-1/2 right-0 rounded-r-[14px] transform -translate-y-1/2 cursor-pointer`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <LuSearch color="gray" />
          </span>

          {isSearchOpen && (
            <input
              type="text"
              className={`border-gray-400 border outline-none w-full p-2 rounded-2xl font-work placeholder:font-normal placeholder:text-[14px]`}
              placeholder="Search for anything"
            />
          )}
        </div>

        {/* Right Section - Profile & Docs */}
        <div
          className={`flex flex-row items-center gap-5 md:gap-8 transition-all duration-500 ${
            isSearchOpen ? "ml-[-80px]" : "ml-0"
          }`}
        >
          <p className="font-roboto font-normal text-[16px] underline text-custon-lightBlue lg:flex hidden">
            Docs
          </p>
          <img
            src="/image/bell.svg"
            alt="bell_image"
            className="w-[19.67px] lg:flex hidden"
          />

          {/* Profile Section */}
          <div className="flex flex-row items-center gap-2 relative">
            <div
              className={`absolute top-12 bg-white px-5 py-5 w-40 -right-14 transition ease-in-out duration-100 ${
                showProfile ? "flex flex-row" : "hidden"
              } md:hidden `}
            >
              <img
                src="/image/profile.svg"
                alt="profile_picture"
                className="w-[40px] rounded-full"
              />
              <p className="font-work font-medium text-[16px] text-custon-lightBlue">
                Adebeji
              </p>
            </div>
            {/* Profile - Always visible on larger screens */}
            <div className="hidden md:flex items-center gap-2">
              <img
                src="/image/profile.svg"
                alt="profile_picture"
                className="w-[40px] rounded-full"
              />
              <p className="font-work font-medium text-[16px] text-custon-lightBlue">
                Adebeji
              </p>
            </div>
            <img
              src="/image/dropdown.svg"
              alt="dropdown_image"
              className="w-[20px] text-custon-lightBlue cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
