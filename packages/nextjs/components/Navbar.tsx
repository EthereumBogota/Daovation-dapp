import { useState } from "react";
import Image from "next/image";

export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-white flex justify-between items-center py-3 px-5 my-3 max-w-[1100px] mx-auto w-full z-10">
      <h1 className="text-2xl">DAOVATION</h1>

      <ul className="md:flex gap-[50px] text-sm hidden">
        <li>Home</li>
        <li>Eventos</li>
        <li>Explore</li>
      </ul>

      <button className="btn md:block hidden">Crear eventos</button>

      <div onClick={() => setOpen(!open)} className={`z-50  ${open && "text-gray-900"} text-3xl md:hidden`}>
        <Image src={open ? "/icon-close.svg" : "/icon-hamburger.svg"} alt="icon" width={20} height={20}></Image>
      </div>

      <div
        className={`md:hidden text-white absolute w-2/3 h-screen z-10
      px-7 py-2 font-medium bg-[#141414] top-0 duration-300 ${open ? "left-0 block" : "right-0 hidden"}`}
      >
        <ul className="flex flex-col justify-center h-[300px] gap-10 py-2 text-lg mt-[200px]">
          <li onClick={() => setOpen(!open)}>Retail</li>

          <li onClick={() => setOpen(!open)}>Get Started</li>
          <li onClick={() => setOpen(!open)}>Our Solutions</li>
          <li onClick={() => setOpen(!open)}>COVID 19</li>
          <li onClick={() => setOpen(!open)}>CAMPAIGNS</li>
          <li onClick={() => setOpen(!open)}>RETAIL</li>
          <li onClick={() => setOpen(!open)}>ABOUT US</li>
        </ul>
      </div>
    </nav>
  );
}
