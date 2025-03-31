

export default function LoginPage() {
    return (
        <div className="flex h-screen">
            {/* Left Section - Image/Illustration */}
            <div className="hidden lg:flex overflow-hidden bg-gray-50 justify-center items-center">
                <div className="w-full">
                    <img
                        src="/12.jpg"
                        alt="Task Management Illustration"
                        className="w-full"
                    />
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
                <div className="w-3/4 max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Та бүртгэгдлээ! 🎉</h1>

                    {/* New Text Box Below h1 */}
                    <div className="mb-4">
                        <label htmlFor="info" className="block text-sm font-medium text-gray-700">
                            Task Flow систeмд тавтай морилно уу. Та өнөөдрөөс эхлэж бүх боломжуудыг 3 өдрийн турш үнэгүй ашиглах боломжтой боллоо! Энэ хугацаанд манай системийг туршиж үзэн, ажлын бүтээмжээ манай систeмийн тусламжтай хэрхэн сайжруулахыг харж болно.

                            3 өдрийн туршилтын хугацаа дууссаны дараа, та манай премиум багц руу 1 хүн тутамд сард 20.000₮-ийн үнээр шилжиж  болно. Энэхүү багц нь хязгааргүй даалгавар, төсөл болон багийн хамтын ажиллагааны боломжуудыг багтаасан.

                            Одоогоор төлбөрийн талаар санаа зовох хэрэггүй—туршилтын хугацаа дуусахаас өмнө бид танд мэдэгдэх тул үргэлжлүүлэх эсэхээ шийдэх боломжтой.

                            Танд асуулт байвал эсвэл тусламж хэрэгтэй бол бидэнтэй холбогдоорой!
                        </label>

                    </div>

                    <form>
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
