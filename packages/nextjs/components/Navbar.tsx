import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "./LoginModal";

export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);

  const openLoginModal = () => {
    (document.getElementById("login-modal") as HTMLDialogElement).showModal();
  };

  return (
    <nav className="text-white flex justify-between items-center py-3 px-5 my-3 max-w-[1100px] mx-auto w-full z-10">
      <Link href={"/"} className="flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={70} height={70} />
        <h1 className="text-2xl">DAOvation</h1>
      </Link>

      <div className="hidden md:flex justify-center items-center gap-10">
        <ul className="gap-12 flex text-sm">
          <Link href={"/"} className="hover:text-blue-300 transition-all grow">
            <li>Home</li>
          </Link>
          <Link href={"/events"} className="hover:text-blue-300 transition-all grow">
            <li>Events</li>
          </Link>
          <Link href={"/daos"} className="hover:text-blue-300 transition-all grow">
            <li>DAOs</li>
          </Link>
        </ul>

        <button className="btn md:block hidden" onClick={openLoginModal}>
          Log in
        </button>
      </div>

      <div
        onClick={() => setOpen(!open)}
        className={`z-50  ${open && "text-gray-900"} text-3xl md:hidden z-20 cursor-pointer ${
          open && "fixed top-8 right-5"
        }`}
      >
        <Image src={open ? "/menu-opened.svg" : "/menu.svg"} alt="icon" width={20} height={20}></Image>
      </div>

      <div
        className={`md:hidden text-white fixed w-1/2 h-screen z-10
      px-7 font-medium flex flex-col items-center justify-center bg-[#141414] top-0 duration-300 ${
        open ? "right-0 block" : "right-0 hidden"
      }`}
      >
        <button className="btn md:hidden block mx-auto" onClick={openLoginModal}>
          Log in
        </button>
        <ul className="flex flex-col justify-center h-[300px] gap-10 text-lg text-center">
          <Link href={"/"} className="hover:text-blue-300">
            <li onClick={() => setOpen(!open)}>Home</li>
          </Link>
          <Link href={"/events"} className="hover:text-blue-300">
            <li onClick={() => setOpen(!open)}>Events</li>
          </Link>
          <Link href={"/"} className="hover:text-blue-300">
            <li onClick={() => setOpen(!open)}>DAOs</li>
          </Link>
        </ul>
      </div>
      <LoginModal />
    </nav>
  );
}
