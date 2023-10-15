import { useEffect, useState } from "react";
import * as React from "react";
import {
  Button,
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

/* import { ExternalLinkIcon } from "@chakra-ui/icons"; */
import { useQRCode } from "next-qrcode";
import { io } from "socket.io-client";

const linkDownloadPolygonIDWalletApp = "https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/#quick-start";
type PolygonIDVerifierProps = {
  credentialType: any;
  issuerOrHowToLink: any;
  onVerificationResult: any;
  publicServerURL: any;
  localServerURL: any;
};
function PolygonIDVerifier({
  credentialType,
  issuerOrHowToLink,
  onVerificationResult,
  publicServerURL,
  localServerURL,
}: PolygonIDVerifierProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState("");
  const [qrCodeData, setQrCodeData] = useState();
  const [isHandlingVerification, setIsHandlingVerification] = useState(false);
  const [verificationCheckComplete, setVerificationCheckComplete] = useState(false);
  const [verificationMessage, setVerfificationMessage] = useState("");
  const [socketEvents, setSocketEvents] = useState<any[]>([]);
  const { Canvas } = useQRCode();
  // serverUrl is localServerURL if not running in prod
  // Note: the verification callback will always come from the publicServerURL
  let serverUrl: string;
  if (typeof window !== "undefined") {
    serverUrl = window.location.href.startsWith("https") ? publicServerURL : localServerURL;
  }
  const getQrCodeApi = serverUrl! + `/api/get-auth-qr?sessionId=${sessionId}`;
  const socket = io(serverUrl!);

  useEffect(() => {
    socket.on("connect", () => {
      setSessionId(socket.id);

      // only watch this session's events
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

  // socket event side effects
  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1];

      if (currentSocketEvent.fn === "handleVerification") {
        console.log("entrooo: ", currentSocketEvent.fn);
        if (currentSocketEvent.status === "IN_PROGRESS") {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status === "DONE") {
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

  // callback, send verification result back to app
  const reportVerificationResult = (result: boolean) => {
    onVerificationResult(result);
  };

  function openInNewTab(url: string) {
    const win = window.open(url, "_blank");
    win?.focus();
  }

  return (
    <>
      <div>
        {sessionId ? (
          <Button colorScheme="purple" onClick={onOpen} margin={4}>
            Prove access rights
          </Button>
        ) : (
          <Spinner />
        )}

        {qrCodeData && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Scan this QR code from your{" "}
                <a href={linkDownloadPolygonIDWalletApp} target="_blank" rel="noreferrer">
                  Polygon ID Wallet App
                </a>{" "}
                to prove access rights
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody textAlign={"center"} color={"red"} fontSize={"12px"}>
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
                        width: 400,
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

              <ModalFooter>
                <Button
                  fontSize={"10px"}
                  margin={1}
                  colorScheme="purple"
                  onClick={() => openInNewTab(linkDownloadPolygonIDWalletApp)}
                >
                  Download the Polygon ID Wallet App {/* <ExternalLinkIcon marginLeft={2} /> */}
                </Button>
                <Button
                  fontSize={"10px"}
                  margin={1}
                  colorScheme="purple"
                  onClick={() => openInNewTab(issuerOrHowToLink)}
                >
                  Get a {credentialType} VC {/* <ExternalLinkIcon marginLeft={2} /> */}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}

export default PolygonIDVerifier;
