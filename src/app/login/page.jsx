"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserStore";

export default function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push(`/${user.Hereglegch_ID}/projects`);
    }
  }, [user, router]);

  const onClickLogin = async () => {
    if (email === "" || password === "") {
      return;
    }
    const result = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    console.log("result---------------->", result);

    const usercheck = await result.json();
    console.log(usercheck);
    if (usercheck.user === null) {
      return;
    }
    setUser(usercheck.user);
    router.push(`/${usercheck.user.Hereglegch_ID}/projects`)
  }

  return (
    <div className="flex h-screen">
      {/* Left Section - Image/Illustration */}
      <div className="items-center justify-center hidden w-full overflow-hidden lg:flex bg-yellow-50">
        <div className="w-full">
          <img
            src="/login-illustration.svg"
            alt="Task Management Illustration"
            className="w-full"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center w-full bg-white lg:w-1/2">
        <div className="w-3/4 max-w-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">Тавтай морил</h1>

          <form onSubmit={(e) => {
            e.preventDefault();
            onClickLogin();
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                И-Мэйл хаяг
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="И-Мэйлээ оруулна уу"
                onChange={onChangeEmail}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Нууц үг
              </label>
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Нууц үгээ оруулна уу"
                onChange={onChangePassword}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Намайг сана</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Нууц үг мартсан?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
            >
              Нэвтрэх
            </button>
          </form>

          <div className="flex items-center justify-center mt-6">
            <button
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 mr-2" />
              <span className="text-gray-600">Google ашиглан нэвтрэх</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Бүртгэлгүй бол{' '}
              <a href="#" className="font-semibold text-blue-500 hover:underline">
                БҮРТГҮҮЛЭХ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
