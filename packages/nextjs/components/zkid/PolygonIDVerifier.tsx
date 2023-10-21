import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/router";
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { io } from "socket.io-client";
import { useAuth } from "~~/context/Authcontext";

const linkDownloadPolygonIDWalletApp =
  "https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/#polygon-id-wallet-app";
type PolygonIDVerifierProps = {
  credentialType: string;
  issuerOrHowToLink: string;
  onVerificationResult: React.Dispatch<React.SetStateAction<boolean>>;
  publicServerURL: string;
  localServerURL: string;
  closeLoginModal: Function;
};
function PolygonIDVerifier({
  credentialType,
  issuerOrHowToLink,
  onVerificationResult,
  publicServerURL,
  localServerURL,
  closeLoginModal,
}: PolygonIDVerifierProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState("");
  const [qrCodeData, setQrCodeData] = useState();
  const [isHandlingVerification, setIsHandlingVerification] = useState(false);
  const [verificationCheckComplete, setVerificationCheckComplete] = useState(false);
  const [verificationMessage, setVerfificationMessage] = useState("");
  const [socketEvents, setSocketEvents] = useState<any[]>([]);
  const { isLoggedIn, login, logout } = useAuth();
  const { Canvas } = useQRCode();
  const router = useRouter();
  const onOpenModal = () => {
    closeLoginModal();
    onOpen();
  };

  let serverUrl: string;
  if (typeof window !== "undefined") {
    serverUrl = window.location.href.startsWith("https") ? publicServerURL : localServerURL;
  }
  const getQrCodeApi = serverUrl! + `/api/get-auth-qr?sessionId=${sessionId}`;
  const socket = io(serverUrl!);

  useEffect(() => {
    socket.on("connect", () => {
      setSessionId(socket.id);

      socket.on(socket.id, arg => {
        setSocketEvents(socketEvents => [...socketEvents, arg]);
      });
    });
  }, []);

  useEffect(() => {
    const fetchQrCode = async () => {
      const response = await fetch(getQrCodeApi);

      const data = await response.text();
      console.log("Respuesta qr:", JSON.parse(data));
      return JSON.parse(data);
    };

    if (sessionId) {
      fetchQrCode().then(setQrCodeData).catch(console.error);
    }
  }, [getQrCodeApi, sessionId]);

  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1];

      if (currentSocketEvent.fn === "handleVerification") {
        if (currentSocketEvent.status === "IN_PROGRESS") {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status === "DONE") {
            console.log("Signin: ", currentSocketEvent.data);
            console.log("Signin: ", currentSocketEvent.data.id);
            localStorage.setItem("verifyid", currentSocketEvent.data.id);
            login();

            setVerfificationMessage("✅ Verified proof");
            setTimeout(() => {
              reportVerificationResult(true);
            }, 2000);
            socket.close();
          } else {
            setVerfificationMessage("❌ Error verifying VC");
          }
        }
      }
    }
  }, [socket, socketEvents]);

  const reportVerificationResult = (result: boolean | ((prevState: boolean) => boolean)) => {
    onVerificationResult(result);
  };

  function openInNewTab(url: string) {
    const win = window.open(url, "_blank");
    win?.focus();
  }

  const logSessionId = () => {
    alert(sessionId);
  };

  return (
    <>
      <div>
        {sessionId ? (
          <button className="btn bg-purple-600 border-none m-2 hover:bg-purple-700" onClick={onOpenModal}>
            Polygon ID
          </button>
        ) : (
          <>
            <button onClick={logSessionId}> ver sesion</button>
            <Spinner />
          </>
        )}

        {qrCodeData && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"20px"} bgColor={"#0F172A"}>
              <ModalHeader color={"#C7F5FF"} fontSize={{ base: "14px", md: "16px" }} w={"90%"}>
                Scan this QR code from your{" "}
                <a href={linkDownloadPolygonIDWalletApp} target="_blank" rel="noreferrer">
                  Polygon ID Wallet App
                </a>{" "}
                to prove access rights
              </ModalHeader>
              <ModalCloseButton color={"white"} />
              <ModalBody textAlign={"center"} color={"#C8F5FF"} fontSize={"12px"}>
                {isHandlingVerification && (
                  <div>
                    <p>Authenticating...</p>
                    <Spinner size={"xl"} colorScheme="purple" my={2} />
                  </div>
                )}
                {verificationMessage}
                {qrCodeData && !isHandlingVerification && !verificationCheckComplete && (
                  <Center marginBottom={1}>
                    <Canvas
                      text={JSON.stringify(qrCodeData)}
                      options={{
                        errorCorrectionLevel: "M",
                        margin: 3,
                        scale: 4,
                        width: 350,
                        color: {
                          dark: "#010599FF",
                          light: "#FFBF60FF",
                        },
                      }}
                    />
                  </Center>
                )}

                {/*      {qrCodeData.body?.scope[0].query && <p>Type: {qrCodeData.body?.scope[0].query.type}</p>}

                {qrCodeData.body.message && <p>{qrCodeData.body.message}</p>}

                {qrCodeData.body.reason && <p>Reason: {qrCodeData.body.reason}</p>} */}
              </ModalBody>

              <ModalFooter display={"flex"} justifyContent={"center"}>
                <button
                  className="btn bg-purple-600 border-none m-2 hover:bg-purple-700 text-[.8em] md:text-[.95em] normal-case"
                  onClick={() => openInNewTab(linkDownloadPolygonIDWalletApp)}
                >
                  Download Polygon ID
                </button>
                <button
                  className="btn bg-purple-600 border-none m-2 hover:bg-purple-700 text-[.8em] md:text-[.95em] normal-case"
                  onClick={() => openInNewTab(issuerOrHowToLink)}
                >
                  Get Credential
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}

export default PolygonIDVerifier;
