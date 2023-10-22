import Image from "next/image";

export default function MustLoginModal(): React.ReactElement {
  const closeLoginModal = () => {
    (document.getElementById(`event-`) as HTMLDialogElement).close();
  };

  return (
    <dialog id={"must-login"} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-slate-900 relative flex flex-col text-center items-center gap-6">
        <div>
          <h1 className="font-bold text-white md:text-2xl py-2">Oops...</h1>
          <p className="px-4">You must login and register your DAO in order to host an event</p>
        </div>
        <div className="modal-action flex items-center mt-0">
          <form method="dialog">
            <button className="btn">OK</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
