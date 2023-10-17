import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PolygonIDVerifier from "./zkid/PolygonIDVerifier";

export default function LoginModal(): React.ReactElement {
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (provedAccessBirthday) {
      console.log("Access Birthday");
      // const redirect = setTimeout(() => {
      //   router.push("/events");
      // }, 1000);
      // return () => clearTimeout(redirect);
    }
  }, [provedAccessBirthday, router]);

  const closeLoginModal = () => {
    (document.getElementById("login-modal") as HTMLDialogElement).close();
  };

  return (
    <dialog id="login-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-slate-900 relative">
        <button onClick={closeLoginModal} className="absolute right-5 top-5 p-1">
          <Image src={"/menu-opened.svg"} alt="icon" width={15} height={15} />
        </button>
        <h3 className="font-bold text-lg text-customBlue">How'd you like to log in?</h3>
        <p className="py-4">To begin your inmersion you can choose to log in:</p>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2 my-4 flex-1">
            <p className="text-center p-3">With dinamic NFT</p>
            <button className="btn btn-neutral m-2">Dynamic NFT</button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="flex flex-col justify-center items-center gap-2 my-4 flex-1">
            <p className="text-center p-3">Totally anonymous with</p>
            <PolygonIDVerifier
              publicServerURL="https://bf15-181-237-171-65.ngrok-free.app/"
              localServerURL="http://localhost:8080"
              credentialType={"KYCAgeCredential"}
              issuerOrHowToLink={"https://issuer-demo.polygonid.me/main"}
              onVerificationResult={setProvedAccessBirthday}
              closeLoginModal={closeLoginModal}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
