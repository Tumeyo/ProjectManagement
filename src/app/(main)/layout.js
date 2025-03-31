import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full flex">
        <Sidebar/>
        <div className="w-full h-full flex flex-col">
            <Header/>
            {children}
        </div>
    </div>
  );
}