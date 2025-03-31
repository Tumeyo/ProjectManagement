"use client";

import { useState } from "react";

const Header = () => {
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    };

    const openProfilePopup = () => {
        setProfilePopupOpen(true);
    };

    const closeProfilePopup = () => {
        setProfilePopupOpen(false);
    };

    return (
        <div className="w-full min-h-[76px] bg-[#2A3D58] flex items-center justify-between px-4">
            <div className="text-white text-lg font-bold">Админ</div>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button onClick={toggleNotification} className="text-white relative">
                        🔔
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
                            <div className="p-4 border-b">Notifications</div>
                            <ul>
                                <li className="p-2 hover:bg-gray-100">Notification 1</li>
                                <li className="p-2 hover:bg-gray-100">Notification 2</li>
                                <li className="p-2 hover:bg-gray-100">Notification 3</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button onClick={openProfilePopup} className="text-white">👤</button>
                </div>
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

export default Header;

