"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "@/components/admincomp/Header";

import Sidebar from "@/components/admincomp/Sidebar";
import { PrismaClient } from "@prisma/client";
import "@/styles/dashboard.module.css";


const prisma = new PrismaClient();

const DashboardPage = () => {
  const [hereglegchCount, setHereglegchCount] = useState(0);
  const [tusulCount, setTusulCount] = useState(0);
  const [setgegdelCount, setSetgegdelCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hereglegch = await prisma.hereglegch.count();
        const tusul = await prisma.tusul.count();
        const setgegdel = await prisma.setgegdel.count();

        setHereglegchCount(hereglegch);
        setTusulCount(tusul);
        setSetgegdelCount(setgegdel);

        const activities = [
          "New user registered",
          "Project A updated",
          "Report generated for Project B",
        ];
        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const tasks = [
    {
      name: "Smart Home Integration System",
      category: "IT",
      status: "Ongoing",
      statusClass: "bg-blue text-blue border-primary-blue",
      startDate: "2024-01-01",
      endDate: "2024-01-14",
    },
    {
      name: "Брэндийн Дүр Төрх Шинэчлэл",
      category: "Marketing",
      status: "Completed",
      statusClass: "bg-mintcream text-mediumseagreen border-mediumseagreen",
      startDate: "2024-02-01",
      endDate: "2024-02-14",
    },
    {
      name: "AI-Powered Content Moderation Tool",
      category: "IT",
      status: "Stopped",
      statusClass: "bg-pink text-tomato border-salmon",
      startDate: "2024-03-01",
      endDate: "2024-03-14",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar />
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Header />
      <div className="w-full h-full flex flex-col items-start justify-start flex-1 py-5 px-16 gap-8 text-left text-base font-open-sans">


        <div className="flex justify-between w-full items-center">
          <div className="flex gap-8">
            <select className="border border-gray-300 rounded-md py-2 px-4">
              <option>Ангилал</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
            <div className="flex">
              <button className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-l-md">
                <Image width={24} height={24} alt="Grid View" src="/Grid.svg" />
              </button>
              <button className="w-11 h-11 flex items-center justify-center border border-primary-blue rounded-r-md">
                <Image width={24} height={24} alt="Table View" src="/Table.svg" />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-black rounded-md border-2 border-blue-500">
            <Image width={16} height={16} alt="Add" src="/add.svg" />
            <span>Төсөл нэмэх</span>
          </button>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-5 gap-4 text-black font-semibold">
            <span>Төслийн нэр</span>
            <span>Ангилал</span>
            <span>Эхэлсэн хугацаа</span>
            <span>Дуусах хугацаа</span>
            <span>Төлөв</span>
          </div>
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 gap-4 py-4 ${index % 2 === 0 ? "bg-gray-100" : ""
                }`}
            >
              <span>{task.name}</span>
              <span className="border border-mediumblue py-1 px-4 rounded-3xs">
                {task.category}
              </span>
              <span>{task.startDate}</span>
              <span>{task.endDate}</span>
              <span
                className={`py-1 px-4 rounded-full border flex items-center justify-center ${task.statusClass}`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>

      </div>
     
    </div>
    </div>
  );
};

export default DashboardPage;
