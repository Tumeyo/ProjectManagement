"use client"

import Link from "next/link";
import AdminContext from "@/context/AdminStore";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { FaChartLine, FaClipboardList, FaProjectDiagram, FaUsers } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
    const { admin, logout } = useContext(AdminContext);
    const router = useRouter();
    const pathname = usePathname();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

    const CollapsibleMenuItem = ({ Icon, label, children }) => (
        <div className="w-full">
            <div
                className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]"
                onClick={() => setIsSettingsOpen((prev) => !prev)}
            >
                <Icon size={24} />
                {label}
            </div>
            {isSettingsOpen && (
                <div className="flex flex-col pl-[40px]">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen min-w-[320px] max-w-[320px] bg-[#2D3540] flex flex-col justify-between text-white text-sm pt-[28px] pb-9">
            <div className="flex flex-col gap-[10px] flex-grow">
                {/* Logo Link */}
                <Link href="/admin/dash">
                    <div className="flex justify-center">
                        <img src='../../../../logo1.png' alt="Logo" />
                    </div>
                </Link>

                <div className="w-full h-[1px] bg-[#505050]" />
                <div className="w-full flex flex-col">
                    <MenuItem Icon={FaProjectDiagram} label="Миний төслүүд" href={`/admin/dash`} />
                    <MenuItem Icon={FaUsers} label="Гишүүд" href={`/admin/members`} />
                    <MenuItem Icon={FaChartLine} label="Тайлан" href={`/admin/lawlahudirdah`} />
                    <MenuItem Icon={FaClipboardList} label="Захиалга" href={`/admin/orders`} />
                    <CollapsibleMenuItem Icon={IoSettingsOutline} label="Тохиргоо">
                        <MenuItem Icon={IoSettingsOutline} label="Хувийн мэдээлэл" href={`/admin/settings/profile`} />
                        <MenuItem Icon={IoSettingsOutline} label="Нууц үг" href={`/admin/settings/password`} />
                    </CollapsibleMenuItem>
                </div>
                <div className="w-full h-[1px] bg-[#505050]" />
            </div>
            <div className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]" onClick={logout}>
                <MdLogout size={24} />
                Гарах
            </div>
        </div>
    );
};

export default Sidebar;
