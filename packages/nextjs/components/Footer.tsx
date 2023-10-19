import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 flex justify-center items-center py-2 mt-5 gap-5">
      <p className="text-md text-white">Developed by</p>
      <Image src="/ethbogota-logo.png" alt="ethbogota-logo" width={100} height={100} className="mx-[-20px]" />
      <p className="text-md text-white">devs</p>
    </footer>
  );
};
