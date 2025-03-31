import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className="flex h-screen">
            {/* Left Section - Image/Illustration */}
            <div className="hidden lg:flex w-full overflow-hidden bg-white justify-center items-center">
                <div className="w-full">
                    <img
                        src="/recover.svg"
                        alt="Task Management Illustration"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-3/3 flex justify-center items-center bg-white">
                <div className="w-3/4 max-w-md">
                    {/* Clickable text above h1 */}
                    <div className="relative mb-6">
                        <a
                            href="#"
                            className="absolute text-sm text-gray-500 hover:underline left-0"
                            style={{ top: '-80px' }}
                        >
                            <span className="mr-2">&#8592;</span> {/* Left arrow (Unicode) */}
                            Буцах
                        </a>
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Нууц үгээ мартсан</h1>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                И-майл хаягаа оруулна уу.
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                
                                placeholder="И-Мэйлээ оруулна уу"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700"
                        >
                            Үргэлжлүүлэх
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
