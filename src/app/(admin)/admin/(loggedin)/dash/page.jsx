"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [admins, setAdmins] = useState([]);
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchAdmin, setSearchAdmin] = useState("");
    const [searchOrder, setSearchOrder] = useState("");
    const [searchPayment, setSearchPayment] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [searchCompany, setSearchCompany] = useState("");

    const [adminCount, setAdminCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);

    useEffect(() => {
        // Fetch Admins
        fetch("/api/admin")
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data);
                setAdminCount(data.length);
            })
            .catch((err) => console.error("Error fetching admins:", err));

        // Fetch Orders
        fetch("/api/zahialga")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data);
                    setOrderCount(data.length);
                } else {
                    console.error("Expected an array for orders but got:", data);
                    setOrders([]);
                    setOrderCount(0);
                }
            })
            .catch((err) => console.error("Error fetching orders:", err));

        // Fetch Payments
        fetch("/api/tulbur")
            .then((res) => res.json())
            .then((data) => {
                setPayments(data);
                setPaymentCount(data.length);
            })
            .catch((err) => console.error("Error fetching payments:", err));

        // Fetch Users
        fetch("/api/hereglegch")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setUserCount(data.length);
            })
            .catch((err) => console.error("Error fetching users:", err));

        // Fetch Companies
        fetch("/api/baiguullaga")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);
                setCompanyCount(data.length);
            })
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    // Chart Data
    const chartData = {
        labels: [ 'Захиалга', 'Төлбөр', 'Хэрэглэгчид', 'Байгууллага'],
        datasets: [
            {
                label: 'Нийт тоо',
                data: [ orderCount, paymentCount, userCount, companyCount],
                backgroundColor: '#4CAF50',
                borderColor: '#388E3C',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {/* You can add Sidebar here */}

            {/* Main Dashboard Content */}
            <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Үзүүлэлт</h1>

                {/* Stats Overview */}
                <section className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Админууд</h3>
                        <p className="text-3xl font-bold text-blue-600">{adminCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Захиалгууд</h3>
                        <p className="text-3xl font-bold text-blue-600">{orderCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Төлбөрүүд</h3>
                        <p className="text-3xl font-bold text-blue-600">{paymentCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Хэрэглэгчид</h3>
                        <p className="text-3xl font-bold text-blue-600">{userCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Байгууллагууд</h3>
                        <p className="text-3xl font-bold text-blue-600">{companyCount}</p>
                    </div>
                </section>

                {/* Chart Section */}
                <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Статистик</h2>
                    <Bar data={chartData} options={{ responsive: true }} />
                </section>

                {/* Admin Section */}
                <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Админ</h2>
                    <input
                        type="text"
                        placeholder="Админ хайх"
                        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setSearchAdmin(e.target.value)}
                    />
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="list-disc list-inside space-y-2">
                            {admins
                                .filter((admin) =>
                                    admin.Admin_ner.toLowerCase().includes(searchAdmin.toLowerCase())
                                )
                                .map((admin) => (
                                    <li key={admin.Admin_ID} className="text-gray-600">
                                        <strong>{admin.Admin_ner}</strong> ({admin.login_name})
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>

                {/* Other Sections (Orders, Payments, Users, Companies) */}
                {/* Add similar sections for Orders, Payments, Users, and Companies */}
            </div>
        </div>
    );
}
