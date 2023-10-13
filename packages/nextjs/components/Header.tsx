import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { ArrowPathIcon, Bars3Icon, BugAntIcon, MagnifyingGlassIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  const { address: connectedAddress } = useAccount();

  const { data: DaovationNFTContract } = useScaffoldContract({
    contractName: "DaovationNFT",
  });

  const { data: owner } = useScaffoldContractRead({
    contractName: "DaovationNFT",
    functionName: "owner",
  });

  useEffect(() => {
    if (owner === undefined || DaovationNFTContract === undefined) return;
    console.log("Smart contract owner", owner);
    console.log("Front address ", connectedAddress);
  }, [DaovationNFTContract, connectedAddress, , owner]);

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-2 text-sm rounded-full gap-1.5`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = router.pathname;
  const notHeader = currentPath === "/";
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/events">Events</NavLink>
      </li>
      <li>
        <NavLink href="/myNFTs">NFTs</NavLink>
      </li>

      <li>
        <NavLink href="/transfers">
          <ArrowPathIcon className="h-4 w-4" />
          Transfers
        </NavLink>
      </li>
      {/*    <li>
        <NavLink href="/ipfsUpload">
          <ArrowUpTrayIcon className="h-4 w-4" />
          IPFS Upload
        </NavLink>
      </li> */}
      {/*  <li>
        <NavLink href="/ipfsDownload">
          <ArrowDownTrayIcon className="h-4 w-4" />
          IPFS Download
        </NavLink>
      </li> */}
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Debug Contracts
        </NavLink>
      </li>
      <li>
        <NavLink href="/blockexplorer">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Block Explorer
        </NavLink>
      </li>
      <li>
        <SwitchTheme className="block lg:hidden ml-5 pointer-events-auto" />
      </li>
    </>
  );

  return (
    <div className={`${notHeader ? "hidden" : "block"}`}>
      <div className="sticky  top-0 navbar bg-primary min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
        <div className="navbar-start w-auto xl:w-1/2">
          <div className="xl:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            >
              <Bars3Icon className="h-1/2" />
            </label>
            {isDrawerOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                {navLinks}
              </ul>
            )}
          </div>
          <Link href="/" passHref className="hidden xl:flex items-center gap-1 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10">
              {/* <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" /> */}
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">Daovation</span>
              <span className="text-xs">Events and rewards</span>
            </div>
          </Link>
          <ul className="hidden xl:flex xl:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>
        <div className="navbar-end flex-grow mr-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
          <SwitchTheme className="hidden lg:block ml-5 pointer-events-auto" />
        </div>
      </div>
    </div>
  );
};
