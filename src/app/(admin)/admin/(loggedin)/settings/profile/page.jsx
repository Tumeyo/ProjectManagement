"use client";

import { useState } from "react";

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/updateAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to save data");
            }

            const data = await response.json();
            console.log("Saved Data:", data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    const openProfilePopup = () => {
        setProfilePopupOpen(true);
    };

    const closeProfilePopup = () => {
        setProfilePopupOpen(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[500px]">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                        <button
                            onClick={openProfilePopup}
                            className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer"
                        >
                            📷
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-500 font-medium mb-1" htmlFor="name">
                                Нэр
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-500" htmlFor="email">
                                И-мэйл
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-gray-500">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="phone">
                                Утасны дугаар
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-500" htmlFor="address">
                                Хаяг
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Хадгалах
                    </button>
                </form>
            </div>

            {isProfilePopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <button onClick={closeProfilePopup} className="absolute top-2 right-2">✖</button>
                        <h2 className="text-lg font-bold mb-4">Change Profile Photo</h2>
                        <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg flex flex-col items-center">
                            <p className="text-gray-600 mb-4">Drop an image here or click to upload</p>
                            <input type="file" className="hidden" id="profile-photo-upload" />
                            <label
                                htmlFor="profile-photo-upload"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                            >
                                Upload Photo
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;