"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoFilterSharp } from "react-icons/io5";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CheckList {
  image: string;
  name: String;
  number: string;
  bgColor: string;
}

interface User {
  id: string;
  organisation: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  bvn: string;
  gender: string;
  maritalstatus: string;
  children: number;
  typeofresidence: string;
  levelofeducation: string;
  employmentstatus: string;
  sectorofemployment: string;
  durationofemployment: string;
  officemail: string;
  monthlyincome: string;
  loanrepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  relationship: string;
}

const check: CheckList[] = [
  {
    image: "/image/loan_users.svg",
    name: "Users",
    number: "2,453",
    bgColor: "bg-gray-100",
  },
  {
    image: "/image/users.svg",
    name: "Active Users",
    number: "2,453",
    bgColor: "bg-gray-200",
  },
  {
    image: "/image/loan_user.svg",
    name: "Users with loan",
    number: "12,453",
    bgColor: "bg-red-100",
  },
  {
    image: "/image/savings_users.svg",
    name: "Users with savings",
    number: "102,453",
    bgColor: "bg-red-200",
  },
];

export default function page() {
  const [entries, setEntries] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [filter, setFilter] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const totalPages = 16;
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setError("");
      try {
        const response = await fetch(
          "https://67c14e7461d8935867e27cf7.mockapi.io/api/users/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: unknown) {
        setError(
          `Error fetching users: ${
            error instanceof Error ? error.message : error
          }`
        );
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!users) {
    return <p>No users found.</p>;
  }

  const handleUserDetail = (user: User) => {
    // Store the selected user details in localStorage
    localStorage.setItem("selctedUser", JSON.stringify(user));
    router.push(`/dashboard/users/${user.id}`);
  };

  // Toggle dropdown for a specific user
  const toggleDropdown = (userId: string) => {
    // If the clicked row is already open, close it; otherwise open it.
    setOpenDropdownId((prev) => (prev === userId ? null : userId));
  };

  const statusMap: { [key in User["status"]]: string } = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    blacklisted: "Blacklisted",
  };

  return (
    <div className="min-h-screen h-full w-full">
      <h2 className="font-work font-medium text-[24px] text-custom-blue lg:px-12 py-5">
        Users
      </h2>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-10 w-full">
        {check.map(({ image, name, number, bgColor }, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl shadow-lg flex flex-col justify-center lg:items-start items-center lg:w-[21%] w-full"
          >
            <div
              className={`w-[40px] rounded-full ${bgColor} px-2 py-2 flex justify-center items-center`}
            >
              <img src={image} alt="image_icon" className={`w-5`} />
            </div>

            <h2 className="font-work font-medium text-[14px] text-custon-lightBlue uppercase mt-3">
              {name}
            </h2>
            <p className="font-work font-bold text-[24px] text-custom-blue">
              {number}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full p-4 overflow-auto mt-10 overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none">
        <table className="border-collapse rounded-lg shadow-md bg-white min-w-full table-auto overflow-scroll md:overflow-auto w-full border ">
          <thead>
            <tr className="text-left text-custom-blue text-sm font-work font-medium text-[12px]">
              {[
                "Organisation",
                "Username",
                "Email",
                "Phone Number",
                "Date Joined",
                "Status",
                "",
              ].map((header, index) => (
                <th
                  key={index}
                  className="py-3 px-4 font-medium whitespace-nowrap border-b"
                >
                  <div className="flex items-center gap-2">
                    {header && (
                      <>
                        {header}
                        <IoFilterSharp
                          className="text-custon-lightBlue cursor-pointer"
                          onClick={() => setFilter(!filter)}
                        />
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr className="border-b" key={user.id}>
                  <td className="py-3 px-4 border font-work font-normal text-[14px] text-custom-blue">
                    {user.organisation}
                  </td>
                  <td className="py-3 px-4 border font-work font-normal text-[14px] text-custom-blue">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 border font-work font-normal text-[14px] text-custom-blue">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border font-work font-normal text-[14px] text-custom-blue">
                    {user.phone}
                  </td>
                  <td className="py-3 px-4 border font-work font-normal text-[14px] text-custom-blue">
                    {user.date}
                  </td>
                  <td className="py-3 px-4 text-red-500 border font-work font-normal text-[14px] text-custom-blue">
                    {statusMap[user.status]}
                  </td>
                  <td className="py-3 px-4">
                    {/*user details */}
                    {openDropdownId === user.id && (
                      <div
                        className={`flex flex-col justify-center items-center gap-4 bg-white shadow-md lg:w-[15%] w-[30%] px-5 py-5 absolute right-10 mt-10`}
                      >
                        <div className="flex flex-row justify-center items-center gap-2 rounded-md">
                          <FaEye className="text-[16px] text-custon-lightBlue" />
                          <h1
                            className="font-work font-medium text-[16px] text-custon-lightBlue cursor-pointer"
                            onClick={() => {
                              setOpenDropdownId(null);
                              handleUserDetail(user);
                            }}
                          >
                            View Details
                          </h1>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <img
                            src="/image/delete_user.svg"
                            alt="delete_user"
                            className="text-[16px]"
                          />
                          <h1 className="font-work font-medium text-[16px] text-custon-lightBlue">
                            Blacklist User
                          </h1>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <img
                            src="/image/activate_user.svg"
                            alt="activate_user"
                            className="text-[16px]"
                          />
                          <h1 className="font-work font-medium text-[16px] text-custon-lightBlue">
                            Activate User
                          </h1>
                        </div>
                      </div>
                    )}

                    <HiOutlineDotsVertical
                      className="text-custom-blue cursor-pointer"
                      onClick={() => toggleDropdown(user.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading users...</td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          className={`bg-white py-10 w-[270px] absolute -mt-[462px] rounded-md shadow-md flex flex-col justify-center gap-6 ${
            filter ? "flex" : "hidden"
          }`}
        >
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Organisation
            </label>
            <select
              name="Select"
              className="w-full border icon-text-blue p-2 rounded-[8px] mt-2 outline-none"
            >
              <option
                value="Employee"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Select
              </option>
              <option
                value="Employee"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Lendsqr
              </option>
              <option
                value="Manager"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Irorun
              </option>
              <option
                value="Manager"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Lendstr
              </option>
            </select>
          </div>
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="User"
              className="w-full outline-none bg-custom-blueInput border p-2 mt-2 rounded-[8px] text-custom-blue font-work placeholder:text-[14px]"
            />
          </div>
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-custom-blueInput border p-2 mt-2 rounded-[8px] text-custom-blue font-work placeholder:text-[14px]"
            />
          </div>
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Date
            </label>
            <input
              type="text"
              placeholder="Date"
              className="w-full outline-none bg-custom-blueInput border p-2 mt-2 rounded-[8px] text-custom-blue font-work placeholder:text-[14px]"
            />
          </div>
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full outline-none bg-custom-blueInput border p-2 mt-2 rounded-[8px] text-custom-blue font-work placeholder:text-[14px]"
            />
          </div>
          <div className="px-5 flex flex-col justify-center items-start">
            <label
              htmlFor=""
              className="text-custon-lightBlue font-work font-medium text-[14px]"
            >
              Status
            </label>
            <select
              name="Select"
              className="w-full border bg-custom-blueInput p-2 rounded-[8px] mt-2 outline-none front-work font-normal text-[14px]"
            >
              <option
                value="Inactive"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Inactive
              </option>
              <option
                value="Active"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Active
              </option>
              <option
                value="Blacklisted"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Blacklisted
              </option>
              <option
                value="Pending"
                className="text-custom-blue font-work font-normal text-[14px]"
              >
                Pending
              </option>
            </select>
          </div>
          <div className="flex flex-row justify-center items-center gap-5 px-5">
            <button
              className="border bg-custom-blueInput py-2 px-2 w-full text-custon-lightBlue font-work font-semibold rounded-[8px] text-[14px]"
              type="submit"
            >
              Reset
            </button>
            <button
              className="filter-blue py-2 px-2 text-white w-full font-work font-semibold text-[14px] rounded-[8px] button-blue"
              type="submit"
            >
              Filter
            </button>
          </div>
        </div>
        {/* Pagination & Entries Count */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-work font-normal text-[14px] text-custom-blue">
              Showing
            </span>
            <div className="relative">
              <button className="flex items-center border px-2 py-1 rounded-md icon-blue">
                {entries} <FiChevronDown className="ml-1" />
              </button>
            </div>
            <span className="font-work font-normal text-[14px] text-custom-blue">
              out of 100
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <button
              className="p-1 border rounded-md disabled:opacity-50 icon-blue text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FiChevronLeft />
            </button>
            {[1, 2, 3, "...", 15, 16].map((page, index) => (
              <button
                key={index}
                className={`px-2 py-1 text-custom-blue font-work text-[16px]`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="p-1 border rounded-md disabled:opacity-50 icon-blue text-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
