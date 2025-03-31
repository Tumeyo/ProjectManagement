"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-black">
      <div className="flex-1 flex flex-col">
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
                
                <button className="w-11 h-11 flex items-center justify-center border border-primary-blue rounded-r-md">
                  <Image width={24} height={24} alt="Table View" src="/Table.svg" />
                </button>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-black rounded-md"
              onClick={() => setIsAddProjectOpen(true)}
            >
              <Image width={16} height={16} alt="Add" src="/add.svg" />
              <span>Төсөл нэмэх</span>
            </button>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-5 gap-4 text-black font-semibold">
              <span>Байгууллагын нэр</span>
              <span>Ангилал</span>
              <span>Эхэлсэн хугацаа</span>
              <span>Дуусах хугацаа</span>
              <span>Төлөв</span>
            </div>
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`grid grid-cols-5 gap-4 py-4 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <span>{task.name}</span>
                <span className="border border-mediumblue py-1 px-4 rounded-3xs">
                  {task.category}
                </span>
                <span>{new Date(task.startDate).toLocaleDateString()}</span>
                <span>{new Date(task.endDate).toLocaleDateString()}</span>
                <span
                  className={`py-1 px-4 rounded-full border flex items-center justify-center ${
                    task.status === "Ongoing"
                      ? "bg-blue text-blue border-primary-blue"
                      : task.status === "Completed"
                      ? "bg-mintcream text-mediumseagreen border-mediumseagreen"
                      : "bg-pink text-tomato border-salmon"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Adding a Project */}
        {isAddProjectOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-lg font-bold mb-4">Add Project</h2>
              {/* Add your modal form here */}
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => setIsAddProjectOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
