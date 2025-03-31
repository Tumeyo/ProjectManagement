"use client"
import { MdWorkOutline, MdLogout } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";

import Link from "next/link";
import UserContext from "@/context/UserStore";
import { useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";


const Sidebar = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [projectOpen, setProjectOpen] = useState(false);
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (user === null && !isLoggingOut) {
          router.push("/login");
        }
    }, [user, router, pathname]);

    const handleLogOut = () =>{
        setIsLoggingOut(true);
        setUser(null);
        setTimeout(() => {
            setIsLoggingOut(false);
            router.push("/");
          }, 300);
    }

    const MenuItem = ({ Icon, label, href }) => (
        <Link href={href}>
        <div className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]">
            <Icon size={24} />
            {label}
        </div>
        </Link>
    );

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/${user.Hereglegch_ID}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (user?.Hereglegch_ID) {
            fetchProjects();
        }
    }, [user?.Hereglegch_ID]);
    return (
        <div className="h-full min-w-[320px] max-w-[320px] bg-[#2D3540] flex flex-col items-center justify-between text-white text-sm pt-[28px] pb-9">
            <div className="w-full flex flex-col items-center gap-[10px]">
                <div>
                    <img src='../../../../logo1.png'/>
                </div>
                <div className="w-full h-[1px] bg-[#505050]"/>
                <div className="w-full flex flex-col">
                    <MenuItem Icon={MdWorkOutline} label="Миний төслүүд" href={`/${user?.Hereglegch_ID}/projects`}/>
                    <MenuItem Icon={HiOutlineUserGroup} label="Гишүүд" href={`/${user?.Hereglegch_ID}/members`}/>
                    <MenuItem Icon={TbReportAnalytics} label="Тайлан" href={`/${user?.Hereglegch_ID}/report`}/>
                    <MenuItem Icon={IoNewspaperOutline} label="Захиалга" href={`/${user?.Hereglegch_ID}/orders`}/>
                    <MenuItem Icon={IoSettingsOutline} label="Тохиргоо" href={`/${user?.Hereglegch_ID}/settings`}/>
                </div>
                <div className="w-full h-[1px] bg-[#505050]"/>
                
                {projects?.map((project, index) => {
                    return(
                    <div
                    key={index}
                    className={`w-full min-h-[44px] flex justify-between items-center gap-2 px-[26px] py-3 cursor-pointer hover:bg-[#3B4452] ${projectOpen ? "bg-[#3B4452]" : "bg-[#2D3540]"}`}
                    onClick={() => setProjectOpen(!projectOpen)}>
                        {project.Tusul_ner}
                        {projectOpen ? <FaChevronDown/> : <FaChevronRight/>}
                    </div>)
                })}
                {error && <div>
                    Error fetching projects: {error}
                </div>}
            </div>
            <div className="w-full h-[44px] flex items-center gap-[15px] py-2 px-[26px] cursor-pointer hover:bg-[#3B4452]" onClick={handleLogOut}>
                <MdLogout size={24}/>
                Гарах
            </div>
        </div>
    );
}
 
export default Sidebar;