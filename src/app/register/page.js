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
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Бүртгүүлэх</h1>
  
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  И-Мэйл хаягаа оруулна уу.
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="И-Мэйлээ оруулна уу"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                 Бүтэн нэрээ оруулна уу.
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Нэрээ оруулна уу"
                />
              </div>
  
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Нууц үг
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Нууц үгээ оруулна уу"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Нууц үг давтах
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Нууц үгээ давтаж оруулна уу"
                />
              </div>
  
             
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-gray-600 rounded-md shadow hover:bg-gray-700"
              >
                Үргэлжлүүлэх
              </button>
            </form>
  
            <div className="flex items-center justify-center mt-6">
              <button
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                <img src="/google-icon.svg" alt="Google" className="h-5 mr-2" />
                <span className="text-gray-600">Google ашиглан бүртгүүлэх</span>
              </button>
            </div>
  
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Бүртгэлтэй бол{' '}
                <a href="#" className="font-semibold text-blue-500 hover:underline">
                  НЭВТРЭХ
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  