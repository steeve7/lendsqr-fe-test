"use client";
import React from"react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { selectShowpassword, toggleShowpassword } from "@/redux/sidebarSlice";

export default function page() {
  const dispatch = useDispatch();
  const showPassword = useSelector(selectShowpassword)

  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 flex lg:flex-row flex-col lg:justify-center justify-start lg:items-center items-start flex-1">
        <div className="lg:w-1/2 p-6 sm:p-12 order-2">
          <div className="mt-12 flex flex-col items-start">
            <h1 className="lg:text-[40px] text-1xl font-bold text-start font-avenir text-header_color lg:px-7 mb-3 text-custom-blue">
              Welcome!
            </h1>
            <p className="text-custon-lightBlue font-avenir font-normal lg:text-[20px] text-[15px] lg:px-7 mb-7">
              Enter details to login.
            </p>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-[30rem]">
                <input
                  className="bg-custom-blueInput text-custom-blue w-full px-8 py-4 rounded-lg text-[14px] font-normal focus:outline-none"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="bg-custom-blueInput text-custom-blue w-full px-8 py-4 mb-3 rounded-lg text-[14px] font-normal focus:outline-none mt-5"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  required
                />
                <span
                  className="font-avenir absolute inset-y-0 right-32 mt-48 flex items-center pr-4 cursor-pointer text-[12px] font-medium text-blue-600 select-none"
                  onClick={() => dispatch(toggleShowpassword())}>
                  {showPassword ? "Hide" : "Show"}
                </span>
                <Link
                  href={"/forgot"}
                  className="text-forget-blue tracking-wide font-semibold text-[12px] font-avenir text-start transition-all duration-300 ease-in-out uppercase"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className=" button-blue mt-5 tracking-wide font-semibold uppercase text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex flex-row gap-2 items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  log in
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex order-1">
          <div className="flex flex-col lg:px-0 px-10 lg:py-0 py-10 gap-10">
            <img
              src="/image/lend_logo.svg"
              alt="Lend_logo"
              className="w-[138.44px]"
            />
            <div className="w-full">
              <img
                src="/image/login_image.svg"
                alt="login_image"
                className=" lg:flex hidden mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
