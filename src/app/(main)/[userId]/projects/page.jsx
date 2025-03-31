"use client"; // Mark as a client component

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiGrid, FiPlus } from "react-icons/fi";
import { MdTableRows } from "react-icons/md";
import { useRouter } from "next/navigation";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const router = useRouter();
    

    // Fetch data from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects`);
                console.log("Response status:", response.status); // Debugging
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Debugging
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);
    const calculateRemainingDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `${diff} өдөр үлдсэн` : "Дууссан";
    };
    

    return (
        <div className="h-full w-full bg-white flex flex-col justify-center items-center px-16 gap-8">
            
            {/* Header Section */}
            <div className="w-full relative flex flex-row items-start justify-between text-left text-base text-[#0C69B0]">
                
                {/* Category Buttons */}
                <div className="flex flex-row items-center justify-start gap-8">
                    <div className="rounded-md bg-[#FFFFFF] border-[#CCCCCD] border-[1px] border-solid box-border h-11 flex flex-row items-center justify-start py-2 px-6 gap-1.5">
                        <div className="relative z-[1]">Ангилал</div>
                        <FiChevronDown className="w-4 h-4 relative overflow-hidden shrink-0 z-[0]" />
                    </div>

                    <div className="rounded-md bg-[#ffffff] flex flex-row items-center justify-start">
                        <div className="w-11 rounded-tl-md rounded-br-none border-[#0C69B0] border-[1px] h-11 flex items-center justify-center cursor-pointer">
                            <FiGrid className="w-6 h-6" />
                        </div>
                        <div className="w-11 rounded-tr-md border-[#CCCCCD] border-[1px] h-11 flex items-center justify-center cursor-pointer">
                            <MdTableRows className="w-6 h-6 text-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Button to Add Project */}
                <div
      onClick={() => router.push('/${userId}/projects/addprojects')}  // Use router to navigate
      className="rounded border-[#0C69B0] border-[1px] flex items-center py-2 px-4 cursor-pointer"
    >
      <FiPlus className="w-4 h-4 text-[#0C69B0] mr-2" />
      <span>Төсөл нэмэх</span>
    </div>
            </div>

            {/* Project Cards */}
            <div className="flex gap-8 w-full">
                {projects.length === 0 ? (
                    <div className="text-gray-500 text-center w-full">
                        Төслүүд олдсонгүй.
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.Tusul_ner}
                            className="border rounded-[20px] border-gray-800 p-8 w-full"
                        >
                            {/* Project Card Details */}
                            <div className="flex justify-between items-start text-[20px] text-black">
                                <div className="font-semibold">{project.Tusul_ner}</div>

                                {/* Project Status */}
                                <div className="rounded-[999px] bg-[#CAE8FF] border-[#0C69B0] h-[42px] flex items-center px-4 text-[#0C69B0]">
                                {project.Tusliin_tuluv?.Tusliin_tuluv_lavlah?.Tusliin_tuluv_lavlah_ner || "Төлөв байхгүй."}
                                </div>
                            </div>

                            {/* Project Manager */}
                            <div className="text-base text-black mt-4">
                                <div className="font-semibold">Төслийн удирдагч</div>
                                {/* key={user.Hereglegch_ner} */}
                                <div className="flex items-center mt-2 gap-2">
                                    <Image
                                        className="w-6 h-6 rounded-full"
                                        src="/user1.png"
                                        alt="User"
                                        width={24}
                                        height={24}
                                    />
                                    <span>
  {project.Tusliin_angilal_lavlah?.Hereglegch?.Hereglegch_angilal?.hereglegch_angilal_ner === "Төслийн менежер"
    ? project.Tusliin_angilal_lavlah.Hereglegch.Hereglegch_angilal.hereglegch_angilal_ner
    : "Удирдагч олдсонгүй"}
</span>

                                </div>
                            </div>

                            {/* Project Description */}
                            <div className="text-[16px] mt-4 text-ellipsis">
    {project.Tailbar || "Тайлбар байхгүй."}
</div>


                            {/* Remaining Days */}
                            <div className="flex justify-between items-center mt-4">
                                <div className="rounded bg-[#9393E1] px-4 py-2 text-white">
                                <p>{calculateRemainingDays(project.Duusah_hugatsaa)}</p>

                                </div>

                                {/* Team Avatars */}
                                <div className="flex">
                                    {project.team?.map((user, idx) => (
                                        <Image
                                            key={idx}
                                            className="w-[42px] h-[42px] rounded-full -ml-2"
                                            src={user.avatar}
                                            alt={user.name}
                                            width={42}
                                            height={42}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
