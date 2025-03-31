import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className="flex h-screen">
            {/* Left Section - Image/Illustration */}
            <div className="items-center justify-center hidden w-full overflow-hidden lg:flex bg-gray-50">
                <div className="w-1/2.5">
                    <img
                        src="/vector.svg"
                        alt="Task Management Illustration"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex items-center justify-center w-full bg-white lg:w-1/2">
                <div className="w-3/4 max-w-md">
                    {/* Clickable text above h1 */}
                    <div className="relative mb-6">
                        <a
                            href="#"
                            className="absolute left-0 text-sm text-gray-500 hover:underline"
                            style={{ top: '-80px' }}
                        >
                            <span className="mr-2">&#8592;</span> {/* Left arrow (Unicode) */}
                            Буцах
                        </a>
                        <h1 className="mb-6 text-3xl font-bold text-gray-800">Байгууллагын талаарх мэдээлэл</h1>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="Company" className="block text-sm font-medium text-gray-700">
                                Байгууллагын нэрээ оруулна уу.
                            </label>
                            <input
                                type="comp"
                                id="comp"
                                name="comp"
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                
                                placeholder="И-Мэйлээ оруулна уу"
                            />
                        </div>

                        {/* Flex container for side-by-side inputs */}
                        <div className="flex mb-4 space-x-4">
                            <div className="flex-1">
                                <label htmlFor="employeesCount" className="block text-sm font-medium text-gray-700">
                                    Ажилчидын тоо
                                </label>
                                <input
                                    type="number"
                                    id="employeesCount"
                                    name="employeesCount"
                                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ажилчдын тоо"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="anotherField" className="block text-sm font-medium text-gray-700">
                                    Багийн гишүүдийн тоо
                                </label>
                                <input
                                    type="number"
                                    id="groupCount"
                                    name="groupCount"
                                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Гишүүдийн тоо"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-gray-600 rounded-md shadow hover:bg-gray-700"
                        >
                            Үргэлжлүүлэх
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
