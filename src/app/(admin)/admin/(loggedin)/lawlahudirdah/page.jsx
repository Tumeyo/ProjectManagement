"use client";
import React, { useState } from "react";
import TosliinTolow from "../components/TosliinTolow";
import DaalgavarTolow from "../components/DaalgavarTolow";
import TolborTolow from "../components/TolborTolow";

const LawlahUdirdah = () => {
    const [selectedOption, setSelectedOption] = useState(0);
    const handleSelectChange = (event) => {
        setSelectedOption(parseInt(event.target.value, 10)); // Parse the value to an integer
    };

    return (
        <div className="w-full h-full px-16 py-8 gap-12 flex flex-col items-end">
            <select
                value={selectedOption}
                className="w-64 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleSelectChange}
            >
                <option value={0}>Төслийн төлөв</option>
                <option value={1}>Төслийн ангилал</option>
                <option value={2}>Даалгаврын төлөв</option>
                <option value={3}>Төлбөрийн төлөв</option>
                <option value={4}>Төлбөрийн төрөл</option>
                <option value={5}>Захиалгын төлөв</option>
            </select>
            {selectedOption === 0 && <TosliinTolow />}
            {selectedOption === 2 && <DaalgavarTolow />}
            {selectedOption === 3 && <TolborTolow />}
        </div>
    );
};

export default LawlahUdirdah;
