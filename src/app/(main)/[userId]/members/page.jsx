'use client';

import React, { useEffect, useState } from 'react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

function Checkbox({ checked, onChange }) {
    return (
        <div onClick={onChange} className="cursor-pointer">
            {checked ? (
                <FaCheckSquare className="text-lg text-blue-500" />
            ) : (
                <FaRegSquare className="text-lg text-gray-400 hover:text-gray-600" />
            )}
        </div>
    );
}

function Dropdown({ value, options, onChange, customClass }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`p-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ${customClass}`}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

function Page() {
    const [hereglegch, setHereglegch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch users from the API with pagination
    useEffect(() => {
        async function fetchHereglegch() {
            try {
                const response = await fetch(`/api/users/members?page=${currentPage}&limit=5`);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setHereglegch(data);
                const total = 100; // Example: replace with total from the API if available
                setTotalPages(Math.ceil(total / 10));
            } catch (error) {
                console.error('Failed to fetch members:', error.message);
            }
        }
        fetchHereglegch();
    }, [currentPage]);

    const toggleCheckbox = (id) => {
        setHereglegch((prev) =>
            prev.map((user) =>
                user.Hereglegch_ID === id ? { ...user, selected: !user.selected } : user
            )
        );
    };

    const updateAngilal = (id, newAngilal) => {
        setHereglegch((prev) =>
            prev.map((user) =>
                user.Hereglegch_ID === id
                    ? { ...user, Hereglegch_angilal_ID: newAngilal }
                    : user
            )
        );
    };

    const updateBaiguullaga = (id, newBaiguullaga) => {
        setHereglegch((prev) =>
            prev.map((user) =>
                user.Hereglegch_ID === id
                    ? { ...user, Baiguullaga_ID: newBaiguullaga }
                    : user
            )
        );
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Хэрэглэгчид</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 text-blue-600 border border-blue-500 rounded-md shadow hover:bg-blue-100">
                        Багийн гишүүн нэмэх
                    </button>
                    <button className="px-4 py-2 text-blue-600 border border-blue-500 rounded-md shadow hover:bg-blue-100">
                        Хугацаа сунгах
                    </button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-md">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4 text-gray-700">Сонгох</th>
                            <th className="p-4 text-gray-700">Хэрэглэгчийн мэдээлэл</th>
                            <th className="p-4 text-gray-700">Үлдсэн хоногууд</th>
                            <th className="p-4 text-gray-700">Ангилал</th>
                            <th className="p-4 text-gray-700">Байгууллага</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hereglegch.map((user) => {
                            const remainingDays = Math.ceil(
                                (new Date(user.Ashiglaj_duusah_hugatsaa) - new Date()) /
                                (1000 * 60 * 60 * 24)
                            );

                            return (
                                <tr key={user.Hereglegch_ID} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <Checkbox
                                            checked={user.selected || false}
                                            onChange={() => toggleCheckbox(user.Hereglegch_ID)}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-lg font-medium text-gray-800">{user.Hereglegch_ner}</p>
                                            <p className="text-sm text-gray-500">{user.Hereglegch_email}</p>
                                            <p className="text-sm text-gray-500">Утас: {user.Hereglegch_utas_no}</p>
                                            <p className="text-sm text-gray-500">Хаяг: {user.Hereglegch_hayag}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {remainingDays < 0 ? (
                                            <span className="font-semibold text-red-500">Хугацаа хэтэрсэн</span>
                                        ) : (
                                            `${remainingDays} өдөр`
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Dropdown
                                            value={user.Hereglegch_angilal_ID}
                                            options={['Төслийн менежер', 'Багийн гишүүн']}
                                            onChange={(newAngilal) => updateAngilal(user.Hereglegch_ID, newAngilal)}
                                            customClass="w-48 text-black"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <Dropdown
                                            value={user.Baiguullaga_ID}
                                            options={['Идэвхтэй', 'Идэвхгүй']}
                                            onChange={(newBaiguullaga) => updateBaiguullaga(user.Hereglegch_ID, newBaiguullaga)}
                                            customClass="w-48 text-black"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 text-blue-600 border border-blue-500 rounded-md shadow disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Өмнөх
                </button>
                <span className="mx-4 text-lg">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 text-blue-600 border border-blue-500 rounded-md shadow disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Дараах
                </button>
            </div>
        </div>
    );
}

export default Page;
