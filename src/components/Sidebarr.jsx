"use client";
import { MdWorkOutline, MdLogout } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";

import Link from "next/link";
import AdminContext from "@/context/AdminStore";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
    const { admin, logout } = useContext(AdminContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (admin === null) {
          router.push("/admin/login");
        }
    }, [admin, router, pathname]);

    const MenuItem = ({ Icon, label, href }) => (
        <Link href={href}>
            <div className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]">
                <Icon size={24} />
                {label}
            </div>
        </Link>
    );

    return (
        <div className="h-full min-w-[320px] max-w-[320px] bg-[#2D3540] flex flex-col items-center justify-between text-white text-sm pt-[28px] pb-9">
            <div className="w-full flex flex-col items-center gap-[10px]">
                <div>
                    <img src='../../../../logo1.png' alt="Logo"/>
                </div>
                <div className="w-full h-[1px] bg-[#505050]"/>
                <div className="w-full flex flex-col">
                    <MenuItem Icon={HiOutlineUserGroup} label="Гишүүд" href={`/members`}/>
                    <MenuItem Icon={MdWorkOutline} label="Миний төслүүд" href={`/projects`}/>
                    <MenuItem Icon={TbReportAnalytics} label="Тайлан" href={`/admin/lawlahudirdah`}/>
                    <MenuItem Icon={TbReportAnalytics} label="Тайлан" href={`/report`}/>
                    <MenuItem Icon={IoNewspaperOutline} label="Захиалга" href={`/orders`}/>
                    <MenuItem Icon={IoSettingsOutline} label="Тохиргоо" href={`/settings`}/>
                </div>
                <div className="w-full h-[1px] bg-[#505050]"/>
            </div>
            <div className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]" onClick={logout}>
                <MdLogout size={24}/>
                Гарах
            </div>
        </div>
    );
};

export default Sidebar;  // Ensure this export is here.

