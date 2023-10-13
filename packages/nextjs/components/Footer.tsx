import { hardhat } from "wagmi/chains";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  return (
    <div className="min-h-0 p-5 mb-11 lg:mb-0 bg-primary">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex space-x-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div className="btn btn-primary btn-sm font-normal cursor-auto gap-0">
                <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
                <span>{nativeCurrencyPrice}</span>
              </div>
            )}
            {getTargetNetwork().id === hardhat.id && <Faucet />}
          </div>
        </div>
      </div>
      <>
        <footer className="md:h-[300px] mt-[50px] flex md:items-center md:justify-center px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-[120px] p-3">
            <div>
              <h2 className="font-bold mb-[20px]">Explore</h2>
              <ul className="flex flex-col gap-[20px] text-sm">
                <li>Tokens</li>
                <li>Apps & Services</li>
                <li>Wallet</li>
                <li>introduction</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
};
