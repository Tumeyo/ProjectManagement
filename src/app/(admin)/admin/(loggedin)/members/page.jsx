"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Users() {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Хэрэглэгчдийн тоо",
                data: [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // Fetch Users
        fetch("/api/hereglegch")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users:", err));

        // Fetch Companies
        fetch("/api/baiguullaga")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    useEffect(() => {
        if (companies.length > 0 && users.length > 0) {
            // Calculate the number of users per company
            const companyUserCount = companies.map((company) => {
                const userCount = users.filter(
                    (user) => user.Baiguullaga_ID === company.Baiguullaga_ID
                ).length;
                return { name: company.Baiguullaga_ner, userCount };
            });

            // Update chart data
            setChartData({
                labels: companyUserCount.map((company) => company.name),
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: companyUserCount.map((company) => company.userCount),
                    },
                ],
            });
        }
    }, [companies, users]);

    return (
        <div className="p-8 bg-gray-100 overflow-y-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Хэрэглэгчид</h1>

            <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Хэрэглэгч</h2>
                <input
                    type="text"
                    placeholder="Хэрэглэгч хайх"
                    className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setSearchUser(e.target.value)}
                />

                {/* Table to display users */}
                <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="px-4 py-2 text-left">Нэр</th>
                                <th className="px-4 py-2 text-left">И-Мейл</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .filter((user) =>
                                    user.Hereglegch_ner.toLowerCase().includes(searchUser.toLowerCase())
                                )
                                .map((user) => (
                                    <tr key={user.Hereglegch_ID} className="border-b border-gray-200">
                                        <td className="px-4 py-2 text-gray-600 ">
                                            <strong>{user.Hereglegch_ner}</strong>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">{user.Hereglegch_email}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Chart Section */}
            <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Companies & Users Chart</h2>
                <div className="w-full h-100">
                    <Bar data={chartData} options={{ responsive: true }} />
                </div>
            </section>
        </div>
    );
}
