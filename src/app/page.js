"use client";

import { useContext, useEffect } from "react";
import UserContext from "@/context/UserStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <Header />
      <div className="bg-[#DDDDDD] font-open-sans">
        {/* Hero Section */}
        <div
          className="flex items-center justify-center h-screen bg-center bg-cover"
          style={{ backgroundImage: "url('/Background2.png')" }}
        >
          <div className="flex flex-col items-center justify-start text-center max-w-[1000px] w-full px-4">
            <Image
              className="w-[130px] h-[130px] rounded-[30px] mb-8"
              width={130}
              height={130}
              alt="Logo"
              src="/Logo.svg"
            />
            <h2 className="mb-2 text-5xl text-black">Ажлаа Бод, Төлөвлө, Цэгцэл</h2>
            <h2 className="mb-4 text-5xl text-gray-500">Бүх зохицуулах зүйлсээ нэг дор</h2>
            <p className="mt-6 mb-6 text-black text-base">
              Төслийн менежментийн системийг ашиглаж ажлаа 50 хүртэлх хувиар хөнгөвчлөөрэй.
            </p>
            <Link href="/register">
              <button className="px-5 py-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                Бидэнтэй нэгдэх
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-[#222830] flex flex-col items-start justify-start py-[126px] px-6 sm:px-12 lg:px-56 box-border text-left text-13xl text-white font-open-sans">
          <div className="flex flex-wrap self-stretch gap-6 sm:gap-8 lg:gap-12">
            {[1, 2, 3].map((num, index) => (
              <div
                key={index}
                className="flex-1 backdrop-blur-[32px] rounded-2xl bg-gradient-to-b from-white/25 to-white/13 overflow-hidden flex flex-col items-start justify-start p-8"
              >
                <div className="flex flex-col items-start self-stretch justify-start gap-4">
                  <div className="relative text-[32px]">{`0${num}`}</div>
                  <div className="w-full text-[24px] sm:w-[305px]">
                    {num === 1 &&
                      "Багуудын чухал ажлуудад төвлөрч, цагийг зөв зохицуулахад тусалдаг."}
                    {num === 2 &&
                      "Харилцаа холбоог сайжруулж, бүх гишүүнүүдийн ойлголт нэгдмэл болгодог."}
                    {num === 3 &&
                      "Ажлуудыг тодорхойлсноор багийн гишүүд өөрсдийн ажлын хариуцлагыг мэдэрдэг."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborate Section */}
        <div className="w-full bg-[#DDDDDD] px-[224px] py-[183px] flex flex-row items-start justify-start gap-20">
          <Image
            className="object-cover"
            width={600}
            height={704}
            alt="Collaborate"
            src="/Collaborate.png"
          />
          <div className="w-full flex flex-col items-start justify-start gap-[53px]">
            <div className="rounded-[80px] bg-red-200 flex items-center justify-start py-[6.7px] px-5 text-red-500 uppercase">
              Хамтран ажиллах
            </div>
            <h1 className="text-[60px] leading-tight text-[#0F0049] w-full">
              Багийн гишүүдтэйгээ хэзээ ч, хаанаас ч ажлаа хийх боломж
            </h1>
            <p className="text-gray opacity-50 text-[24px] text-[#111827]">
              Энэ нь таныг төслийг удирдах, харилцаа холбоог сайжруулах, мөн бүх зүйлийг хялбархан
              зохицуулж, ямар ч байршлаас ажиллах боломжийг олгоно.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#dddddd] w-full h-[700px] flex flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-black text-[39.2px] tracking-[-0.03em]">Холбоо барих</h2>
          <form className="w-[836.2px] flex flex-wrap gap-x-[26px] gap-y-5">
            {[
              { label: "Байгууллагын нэр", placeholder: "Байгууллагын нэр", id: "organizationName" },
              { label: "Холбогдох утас", placeholder: "Холбогдох утас", id: "contactPhone" },
              { label: "Цахим шуудан", placeholder: "Цахим шуудан", id: "email", type: "email" },
              { label: "Зурвас бичих", placeholder: "Энд бичнэ үү...", id: "message", textarea: true },
            ].map((field, index) => (
              <div key={index} className={field.textarea ? "w-full" : "w-[402.4px]"}>
                <label htmlFor={field.id} className="block mb-1 text-black text-[15.68px]">
                  {field.label}
                </label>
                {field.textarea ? (
                  <textarea
                    id={field.id}
                    rows="4"
                    className="w-full h-[138.5px] rounded-[10.45px] bg-white border border-lightgray px-3 py-2"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type || "text"}
                    className="w-full h-[52.3px] rounded-[10.45px] bg-white border border-lightgray px-3"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="w-full flex justify-center">
              <button type="submit" className="px-5 py-3 bg-gray-500 rounded-[4px] hover:bg-gray-600">
                Илгээх
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
