"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowDropRightLine } from "react-icons/ri";

interface DashboardMenu {
  name: string;
  image?: string;
  submenu?: DashboardMenu[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const [isSwitchOrgOpen, setIsSwitchOrgOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleMenuClick = (menuName: string): void => {
    toggleSidebar();
    if (menuName === "Users") {
      router.push("/dashboard/users"); // Navigate to "dashboard/user"
    }
  };

  const sidebarMenu: DashboardMenu = {
    name: "Switch Organization",
    image: "/image/briefcase 1.svg",
    submenu: [
      { name: "Dashboard", image: "/image/dashboard.svg" },
      {
        name: "Customers",
        submenu: [
          { name: "Users", image: "/image/user-friends 1.svg" },
          { name: "Guarantors", image: "/image/users 1.svg" },
          { name: "Loans", image: "/image/sack 1.svg" },
          {
            name: "Decision Models",
            image: "/image/handshake-regular 1.svg",
          },
          { name: "Savings", image: "/image/piggy-bank 1.svg" },
          { name: "Loan Requests", image: "/image/Group 104.svg" },
          { name: "Whitelist", image: "/image/user-check 1.svg" },
          { name: "Karma", image: "/image/user-times 1.svg" },
        ],
      },
      {
        name: "Business",
        submenu: [
          { name: "Organization", image: "/image/organisation.svg" },
          { name: "Loan Products", image: "/image/loanProduct.svg" },
          { name: "Savings Products", image: "/image/savings.svg" },
          { name: "Fees and Charges", image: "/image/feeServices.svg" },
          { name: "Transactions", image: "/image/transaction.svg" },
          { name: "Services", image: "/image/services.svg" },
          { name: "Service Account", image: "/image/serviceAccount.svg" },
          { name: "Settlements", image: "/image/settlement.svg" },
          { name: "Reports", image: "/image/reports.svg" },
        ],
      },
      {
        name: "Settings",
        submenu: [
          { name: "Preferences", image: "/image/preference.svg" },
          { name: "Fees and Pricing", image: "/image/feesPricing.svg" },
          { name: "Audit Logs", image: "/image/AuditLog.svg" },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <div
        className={`w-full md:w-[283px] bg-white text-black p-4 absolute md:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div
          className="flex items-center justify-between cursor-pointer p-2"
          onClick={() => setIsSwitchOrgOpen(!isSwitchOrgOpen)}
        >
          <div className="flex items-start justify-start gap-2">
            <img
              src={sidebarMenu.image}
              alt={sidebarMenu.name}
              className="w-[16px]"
            />
            <span className="font-normal font-work text-[16px] text-custon-lightBlue">
              {sidebarMenu.name}
            </span>
          </div>
          <RiArrowDropRightLine
            size={30}
            className={`${isSwitchOrgOpen ? "rotate-90" : ""}`}
          />
        </div>

        {isSwitchOrgOpen && (
          <div>
            {sidebarMenu.submenu?.map((menu) => (
              <div key={menu.name}>
                <div
                  className="flex justify-start items-start gap-2 cursor-pointer p-2"
                  onClick={() => handleMenuClick(menu.name)}
                >
                  {menu.image && (
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="font-work font-normal text-[16px] text-custon-lightBlue"
                    />
                  )}

                  <span className="font-work font-normal text-[16px] text-custon-lightBlue">
                    {menu.name}
                  </span>
                </div>
                {menu.submenu && (
                  <div>
                    {menu.submenu.map((sub) => (
                      <div
                        key={sub.name}
                        className="flex items-start gap-2 cursor-pointer p-2"
                        onClick={() => handleMenuClick(sub.name)}
                      >
                        <img src={sub.image} alt={sub.name} />
                        <span className="font-work font-normal text-[16px] text-custon-lightBlue">
                          {sub.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
