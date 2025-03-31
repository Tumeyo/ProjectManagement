"use client"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AdminContext from "@/context/AdminStore";

export default function LoginPage() {
  const { admin, setAdmin } = useContext(AdminContext);
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const router = useRouter();
  useEffect(() => {
      if (admin) {
          router.push(`/admin/dash`);
      }
  }, [admin, router]);

  const onClickLogin = async () => {
    if(name === "" || password === "") {
        return;
    }
    const result = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            password,
        }),
    })
    console.log("result---------------->", result);
    const admincheck = await result.json();
    console.log(admincheck);
    if(admincheck.admin === null) {
        return;
    }
    setAdmin(admincheck.admin);
    router.push("/admin/lawlahudirdah")
}

  return (
      <div className="flex h-screen">
      <div className="items-center justify-center hidden w-full overflow-hidden lg:flex bg-yellow-50">
        <div className="w-full">
          <img
            src="/login-illustration.svg"
            alt="Task Management Illustration"
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full bg-white lg:w-1/2">
        <div className="w-3/4 max-w-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">Админ нэвтрэх</h1>

          <form onSubmit={(e) => {
            e.preventDefault();
            onClickLogin();
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Нэвтрэх нэр
              </label>
              <input
                name="name"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Нэвтрэх нэрээ оруулна уу"
                onChange={onChangeName}
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

            
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
            >
              Нэвтрэх
            </button>
          </form>

         
        </div>
      </div>
    </div>
  );
}
  