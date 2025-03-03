"use client";
import React, { useEffect} from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineStarOutline } from "react-icons/md";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/redux/userDetailsSlice";
import { RootState, AppDispatch } from "@/redux/store";

export default function Page() {
   const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams() as { id: string };

  // Dispatch thunk on mount whenever id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(id));
    }
  }, [dispatch, id]);

  // Get user details from Redux store
  const { user, loading, error } = useSelector(
    (state: RootState) => state.userDetail
  );

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>No user details found.</p>;
  }

  return (
    <section className="w-full min-h-screen">
      <div>
        <div className="flex justify-start flex-row items-center">
          <FaArrowLeftLong className="text-custon-lightBlue w-[30px]" />
          <Link
            href={"/dashboard/users"}
            className="font-work font-normal text-custon-lightBlue text-[16px]"
          >
            Back to Users
          </Link>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between items-start lg:px-5 mt-10">
          <div className="">
            <h2 className="font-work font-medium lg:text-[24px] text-[18px] text-custon-lightBlue">
              User Details
            </h2>
            `
          </div>
          <div className="flex md:flex-row flex-col gap-4">
            <button className="border border-red-300 font-work px-3 py-2 font-semibold rounded-[8px] text-[10px] lg:text-[14px] text-red-300 uppercase">
              Blacklist Users
            </button>
            <button className="border border-blue-200 font-work px-3 py-2 rounded-[8px] font-semibold text-[10px] lg:text-[14px] text-blue-200 uppercase">
              Activate Users
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg w-full lg:py-12 py-6 px-5 lg:px-10 mt-10 rounded-md">
          <div className="flex flex-col md:flex-row justify-start items-center lg:gap-1 gap-5 w-full mb-10">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="rounded-full px-3 py-3 bg-gray-300 text-custon-lightBlue">
                <AiOutlineUser size={40} />
              </span>

              <div className="flex flex-col justify-start items-center gap-2">
                <h2 className="font-work font-medium lg:text-[22px] text-[15px] text-custon-lightBlue">
                  {user.name}
                </h2>
                <p className="font-work font-normal text-[10px] lg:text-[14px] text-custon-lightBlue">
                  {user.id}
                </p>
              </div>
            </div>
            <div className="border text-custom-blue w-20 md:rotate-90" />
            <div className="flex flex-col gap-2">
              <h5 className="front-work font-medium text-[10px] lg:text-[14px] text-custon-lightBlue">
                Users Tier
              </h5>
              <div className="flex flex-row gap-2 text-[10px] lg:text-[20px]">
                <MdOutlineStarOutline color="yellow" />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
              </div>
            </div>
            <div className="border text-custom-blue w-20 md:rotate-90" />
            <div className="flex flex-col gap-2">
              <p className="font-work font-medium text-[11px] lg:text-[22px] text-custon-lightBlue">
                200,000.00
              </p>
              <p className="front-work font-medium text-[8px] lg:text-[12px] text-custon-lightBlue">
                9912345678/Providus Bank
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:gap-20 gap-5 justify-center items-center lg:-mb-10 -mb-3">
            <button className="font-work font-normal text-[16px] text-blue-300 cursor-pointer">
              General Details
            </button>
            <button className="font-work font-normal text-[10px] lg:text-[16px] text-black cursor-pointer">
              Documents
            </button>
            <button className="font-work font-normal text-[10px] lg:text-[16px] text-black cursor-pointer">
              Bank Details
            </button>
            <button className="font-work font-normal text-[10px] lg:text-[16px] text-black cursor-pointer">
              Loans
            </button>
            <button className="font-work font-normal text-[10px] lg:text-[16px] text-black cursor-pointer">
              Savings
            </button>
            <button className="font-work font-normal text-[10px] lg:text-[16px] text-black cursor-pointer">
              App and System
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg w-full py-10 px-10 mt-20 rounded-md">
        <h2 className="font-work font-medium text-[16px] text-custon-lightBlue py-7">
          Personal Information
        </h2>
        <div className="grid md:grid-cols-5 grid-cols-2 w-full gap-10 py-5">
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Full Name
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.name}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Phone Number
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.phone}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Email Address
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.email}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              BVN
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.bvn}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Gender
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.gender}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Marital Status
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.maritalstatus}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Children
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.children}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Type Of Residence
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.typeofresidence}
            </p>
          </div>
        </div>
        <div className="border text-custom-blue w-full" />
        <h2 className="font-work font-medium text-[16px] text-custon-lightBlue py-7">
          Education and Employment
        </h2>
        <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-10 py-5">
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Level Of education
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.levelofeducation}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Employment Status
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.employmentstatus}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Sector of employment
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.sectorofemployment}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Duration of employment
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.durationofemployment}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              office email
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.officemail}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              monthly income
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.monthlyincome}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Loan repayment
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.loanrepayment}
            </p>
          </div>
        </div>
        <div className="border text-custom-blue w-full" />
        <h2 className="font-work font-medium text-[16px] text-custon-lightBlue py-7">
          Socials
        </h2>
        <div className="grid md:grid-cols-5 grid-cols-2 w-full gap-10 py-5">
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Twitter
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.twitter}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Facebook
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.facebook}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              instagram
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.instagram}
            </p>
          </div>
        </div>
        <div className="border text-custom-blue w-full" />
        <h2 className="font-work font-medium text-[16px] text-custon-lightBlue py-7">
          Guarantor
        </h2>
        <div className="grid md:grid-cols-5 grid-cols-2 w-full gap-10 py-5">
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Full name
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.name}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              phone number
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.phone}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Email address
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.email}
            </p>
          </div>
          <div>
            <h2 className="font-work font-normal text-[12px] text-custon-lightBlue uppercase">
              Relationship
            </h2>
            <p className="font-work font-medium text-[16px] text-custon-lightBlue">
              {user.relationship}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
