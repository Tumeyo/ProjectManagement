"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [admins, setAdmins] = useState([]);
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchOrder, setSearchOrder] = useState("");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Компаниудын төлбөр",
                data: [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        // Fetch Admins
        fetch("/api/admin")
            .then((res) => res.json())
            .then((data) => setAdmins(data))
            .catch((err) => console.error("Error fetching admins:", err));

        // Fetch Orders
        fetch("/api/zahialga")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data);  // Only set if data is an array
                } else {
                    console.error("Expected an array for orders but got:", data);
                    setOrders([]);  // Fallback to empty array
                }
            })
            .catch((err) => console.error("Error fetching orders:", err));

        // Fetch Payments
        fetch("/api/tulbur")
            .then((res) => res.json())
            .then((data) => setPayments(data))
            .catch((err) => console.error("Error fetching payments:", err));

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
        if (orders.length > 0) {
            // Group orders by company and calculate total spending
            const companySpending = orders.reduce((acc, order) => {
                const companyName = order.Baiguullaga.Baiguullaga_ner;  // Assuming the company name is in the Baiguullaga object
                const amount = order.Zahialgiin_dun;

                if (acc[companyName]) {
                    acc[companyName] += amount;
                } else {
                    acc[companyName] = amount;
                }
                return acc;
            }, {});

            // Prepare data for the chart
            const companiesNames = Object.keys(companySpending);
            const amounts = Object.values(companySpending);

            setChartData({
                labels: companiesNames,
                datasets: [
                    {
                        label: "Компаниудын төлсөн төлбөр",
                        data: amounts,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [orders]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {/* You can add Sidebar here */}

            {/* Main Dashboard Content */}
            <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                    Захиалга
                </h1>

                {/* Orders Section */}
                <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Захиалгууд</h2>
                    <input
                        type="text"
                        placeholder="Search Orders"
                        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setSearchOrder(e.target.value)}
                    />
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left text-gray-800">Байгууллага</th>
                                    <th className="px-4 py-2 text-left text-gray-800">Хэрэглэгчдийн тоо</th>
                                    <th className="px-4 py-2 text-left text-gray-800">Огноо</th>
                                    <th className="px-4 py-2 text-left text-gray-800">Төлсөн</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders
                                    .filter((order) =>
                                        order.Zahialga_id.toString().includes(searchOrder.toLowerCase())
                                    )
                                    .map((order) => (
                                        <tr key={order.Zahialga_id} className="border-t hover:bg-gray-100 text-gray-600">
                                            <td className="px-4 py-2">{order.Baiguullaga.Baiguullaga_ner}</td>
                                            <td className="px-4 py-2">{order.Hereglegchiin_too}</td>
                                            <td className="px-4 py-2">{new Date(order.Zahialga_ognoo).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{order.Zahialgiin_dun}₮</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Chart Section */}
                <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Компаниудын төлсөн төлбөр</h2>
                    <div className="w-full h-100">
                        <Bar data={chartData} options={{ responsive: true }} />
                    </div>
                </section>
            </div>
        </div>
    );
}
