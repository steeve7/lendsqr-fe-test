import React from "react";
import Link from "next/link";

export default function Dashboard(){
  return (
    <div className="flex justify-center items-center gap-10 px-20 py-20 md:flex-row flex-col">
      <div className="border bg-custom-blueInput py-2 px-2 w-full text-custon-lightBlue font-work font-semibold rounded-[8px] text-[14px flex justify-center items-center">
        <Link href={"/login"}>Login Page</Link>
      </div>
      <div className="filter-blue py-2 px-2 text-white w-full font-work font-semibold text-[14px] rounded-[8px] button-blue flex justify-center items-center">
        <Link href={"/dashboard"}>Dasboard Page</Link>
      </div>
    </div>
  );
}
