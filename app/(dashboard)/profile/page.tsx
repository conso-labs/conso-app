/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import BadgesBackground from "@/components/backgrounds/Badges";
import ProfileCard from "@/components/profile/ProfileCard";
import ConsoButton from "@/components/common/ConsoButton";
import { useConsoUser } from "@/contexts/ConsoUserContext";

import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { SealClient } from "@mysten/seal";
import { fromHex, toHex } from "@mysten/sui/utils";
import { useNetworkVariable } from "@/lib/sui/networkConfig";
import { useState, useRef, useEffect } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { toPng } from "html-to-image";

type MintingState =
  | "idle"
  | "encrypting-data"
  | "uploading-data"
  | "generating-image"
  | "uploading-image"
  | "minting"
  | "success"
  | "error";

interface MintedPassport {
  objectId: string;
  mintedAt: string;
  transactionDigest: string;
  encryptedDataBlobId: string;
  imageBlobId: string;
}

const SUI_VIEW_OBJECT_URL = `https://suiscan.xyz/testnet/object`;
const WALRUS_AGGREGATOR_URL = `https://walruscan.com/testnet/blob`;
const PUBLISHER_URL = "https://publisher.walrus-testnet.walrus.space/v1/blobs";
const CONSO_PASSPORT_STORAGE_KEY = "conso_minted_passport";

const ProfilePage = () => {
  const { consoUser } = useConsoUser();
  const packageId = useNetworkVariable("packageId");
  const consoPassportPackageId = useNetworkVariable("consoPassportPackageId");
  const suiClient = useSuiClient();
  const profileCardRef = useRef<HTMLDivElement>(null);

  const [mintingState, setMintingState] = useState<MintingState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mintedObjectId, setMintedObjectId] = useState<string>("");
  const [mintedPassport, setMintedPassport] = useState<MintedPassport | null>(
    null
  );

  const currentAccount = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const platforms = consoUser.connectedAccounts;

  const serverObjectIds = [
    "0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75",
    "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8",
  ];

  // Load minted passport from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSO_PASSPORT_STORAGE_KEY);
    if (stored) {
      try {
        const passport = JSON.parse(stored) as MintedPassport;
        setMintedPassport(passport);
        setMintedObjectId(passport.objectId);
        setMintingState("success");
      } catch (error) {
        console.error("Failed to parse stored passport:", error);
        localStorage.removeItem(CONSO_PASSPORT_STORAGE_KEY);
      }
    }
  }, []);

  const saveMintedPassportToStorage = (
    objectId: string,
    digest: string,
    encryptedDataBlobId: string,
    imageBlobId: string
  ) => {
    const passport: MintedPassport = {
      objectId,
      transactionDigest: digest,
      mintedAt: new Date().toISOString(),
      encryptedDataBlobId,
      imageBlobId,
    };
    localStorage.setItem(CONSO_PASSPORT_STORAGE_KEY, JSON.stringify(passport));
    setMintedPassport(passport);
  };

  const storeBlobOnWalrus = async (data: Uint8Array): Promise<string> => {
    const response = await fetch(PUBLISHER_URL, {
      method: "PUT",
      //@ts-ignore
      body: data,
    });

    if (response.status === 200) {
      const info = await response.json();

      // Extract blob ID from response
      if (info.newlyCreated?.blobObject?.blobId) {
        return info.newlyCreated.blobObject.blobId;
      } else if (info.alreadyCertified?.blobId) {
        return info.alreadyCertified.blobId;
      }

      throw new Error("Invalid response from Walrus");
    } else {
      throw new Error(`Failed to upload to Walrus: ${response.status}`);
    }
  };

  const handleSealEncryptAndUploadOnWalrus = async (): Promise<{
    dataUrl: string;
    blobId: string;
  }> => {
    // Encrypt consoUser data using Seal and upload to Walrus
    const nonce = crypto.getRandomValues(new Uint8Array(5));
    const policyObjectBytes = fromHex("");
    const id = toHex(new Uint8Array([...policyObjectBytes, ...nonce]));

    const client = new SealClient({
      suiClient,
      serverConfigs: serverObjectIds.map((id) => ({
        objectId: id,
        weight: 1,
      })),
      verifyKeyServers: false,
    });

    setMintingState("encrypting-data");

    const { encryptedObject: encryptedBytes } = await client.encrypt({
      threshold: 2,
      packageId,
      id,
      data: new Uint8Array(Buffer.from(JSON.stringify(consoUser))),
    });

    console.log("Encrypted user data successfully");

    setMintingState("uploading-data");

    // Upload encrypted data to Walrus
    const blobId = await storeBlobOnWalrus(encryptedBytes);
    const dataUrl = `${WALRUS_AGGREGATOR_URL}/${blobId}`;

    console.log("Encrypted data uploaded to Walrus:", dataUrl);

    return { dataUrl, blobId };
  };

  const generateProfileCardImage = async (): Promise<Blob> => {
    if (!profileCardRef.current) {
      throw new Error("Profile card reference not found");
    }

    const dataUrl = await toPng(profileCardRef.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const response = await fetch(dataUrl);
    return await response.blob();
  };

  async function mintConsoPassportOnSui() {
    if (!currentAccount) {
      setErrorMessage("Please connect your wallet first");
      setMintingState("error");
      return;
    }

    try {
      setErrorMessage("");

      // Step 1: Encrypt and upload user data to Walrus
      const { dataUrl: encryptedDataUrl, blobId: encryptedDataBlobId } =
        await handleSealEncryptAndUploadOnWalrus();
      console.log("User data encrypted and uploaded:", encryptedDataUrl);

      // Step 2: Generate image from ProfileCard
      setMintingState("generating-image");
      const imageBlob = await generateProfileCardImage();
      const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());

      // Step 3: Upload image to Walrus
      setMintingState("uploading-image");
      const imageBlobId = await storeBlobOnWalrus(imageBytes);
      const imageUrl = `${WALRUS_AGGREGATOR_URL}/${imageBlobId}`;
      console.log("Profile card image uploaded:", imageUrl);

      // Step 4: Mint NFT on Sui
      setMintingState("minting");

      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.pure.string("Conso Passport"),
          tx.pure.string("This is my unique Consumer Passport."),
          tx.pure.string(imageUrl),
        ],
        target: `${consoPassportPackageId}::testnet_soulbound_nft::mint_to_sender`,
      });

      const result = await signAndExecuteTransaction({
        transaction: tx,
      });

      const txResult = await suiClient.waitForTransaction({
        digest: result.digest,
        options: { showEffects: true },
      });

      const objectId = txResult.effects?.created?.[0]?.reference?.objectId;

      if (objectId) {
        setMintedObjectId(objectId);
        setMintingState("success");
        saveMintedPassportToStorage(
          objectId,
          result.digest,
          encryptedDataBlobId,
          imageBlobId
        );
        console.log("Minted Conso Passport NFT:", objectId);
      } else {
        throw new Error("Failed to retrieve minted NFT object ID");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to mint NFT. Please try again."
      );
      setMintingState("error");
    }
  }

  const getMintButtonText = () => {
    switch (mintingState) {
      case "encrypting-data":
        return "Encrypting with Seal...";
      case "uploading-data":
        return "Uploading User Data to Walrus...";
      case "generating-image":
        return "Generating Image...";
      case "uploading-image":
        return "Uploading Passport to Walrus...";
      case "minting":
        return "Minting Consumer Passport...";
      case "success":
        return "Minted Successfully!";
      case "error":
        return "Mint Failed - Retry";
      default:
        return "Mint Onchain";
    }
  };

  const isProcessing = [
    "encrypting-data",
    "uploading-data",
    "generating-image",
    "uploading-image",
    "minting",
  ].includes(mintingState);

  const handleShareOnX = () => {
    const text = encodeURIComponent(
      `I just minted my Consumer Passport NFT on @conso_xyz! 🎮\n\nView my passport on Sui:\n`
    );
    const url = encodeURIComponent(`${SUI_VIEW_OBJECT_URL}/${mintedObjectId}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleViewPassport = () => {
    window.open(
      `${SUI_VIEW_OBJECT_URL}/${mintedObjectId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const isAlreadyMinted = mintedPassport !== null;

  return (
    <div className="relative overflow-hidden">
      <BadgesBackground />

      <div className="fixed left-1/2 -translate-x-1/3 z-10 max-w-4xl w-full py-8">
        <div className="h-140">
          <ProfileCard
            ref={profileCardRef}
            user={{
              name: "Vintromyth",
              username: consoUser.substringSuiAddress || "@vintromyth",
              avatar: "/images/others/profile.jpg",
            }}
            zaps={consoUser.zapsScore}
            badges={consoUser.badges}
            consumerScore={consoUser.consumerPercentile}
            platforms={platforms}
            className="h-full"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center gap-3 mt-6">
          {/* Walrus Blob Information - Left Side */}
          {mintedPassport && (
            <div className="flex gap-2 text-xs">
              <a
                href={`${WALRUS_AGGREGATOR_URL}/${mintedPassport.encryptedDataBlobId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-colors border border-gray-200"
              >
                Encrypted Data
              </a>
              <a
                href={`${WALRUS_AGGREGATOR_URL}/${mintedPassport.imageBlobId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-colors border border-gray-200"
              >
                Passport Image
              </a>
            </div>
          )}

          {/* Action Buttons - Right Side */}
          <div className="flex gap-3">
            {isAlreadyMinted ? (
              <>
                <ConsoButton
                  text="View Passport"
                  className="bg-blue-400 text-white"
                  onClick={handleViewPassport}
                />
                <ConsoButton
                  text="Share on 𝕏"
                  className="bg-white text-black"
                  onClick={handleShareOnX}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-end gap-2">
                  <ConsoButton
                    text={getMintButtonText()}
                    className={`${
                      mintingState === "success"
                        ? "bg-green-400 text-black"
                        : mintingState === "error"
                        ? "bg-red-400 text-white"
                        : "bg-orange-300 text-black"
                    }`}
                    onClick={mintConsoPassportOnSui}
                    disabled={isProcessing || mintingState === "success"}
                  />
                  {mintingState === "success" && mintedObjectId && (
                    <a
                      href={`${SUI_VIEW_OBJECT_URL}/${mintedObjectId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      View NFT on Explorer
                    </a>
                  )}
                  {mintingState === "error" && errorMessage && (
                    <p className="text-xs text-red-500 max-w-xs text-right">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <ConsoButton
                  disabled
                  text="Share on 𝕏"
                  className="bg-white text-black opacity-50"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
