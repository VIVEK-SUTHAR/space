"use client";

import { CampaignContractABI } from "@/config";
import getNFTDetails, { NFTDetails } from "@/utils/getNFTDetails";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import getIPFSLink from "../../../utils/getIPFSLink";
import Button from "@/components/Button";
import { toast } from "react-toastify";

export default function NFTDetail({ params }: { params: { id: string } }) {
  const [nftDetails, setNftDetails] = useState<NFTDetails | null>(null);
  const { isConnected, address } = useAccount();

  const { data: rawmetadata, error } = useContractRead({
    abi: CampaignContractABI,
    address: params.id as `0x${string}`,
    functionName: "metadataUri",
  });

  const { config } = usePrepareContractWrite({
    address: params.id as `0x${string}`,
    abi: CampaignContractABI,
    functionName: "safeMint",
  });

  const { write, data } = useContractWrite(config);

  useEffect(() => {
    if (rawmetadata) {
      getNFTDetails(getIPFSLink(rawmetadata as string))
        .then((res) => setNftDetails(res!))
        .catch((er) => {
          console.log(er);
        });
    }
  }, [rawmetadata]);

  async function MintNFT() {
    if (!isConnected) {
      toast.error("Please connect your wallet", {
        hideProgressBar: true,
        style: {
          color: "black",
          borderColor: "red",
          borderWidth: 1,
        },
      });
    }
    write?.();
    console.log(data);
  }

  return (
    nftDetails && (
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex  gap-8 flex-col-reverse md:flex-row-reverse">
            <div className="flex flex-col flex-[0.5]">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:leading-tight lg:text-5xl">
                {nftDetails.name}
              </h2>
              <p className="text-lg leading-relaxed text-black">
                {nftDetails.description}
              </p>
              <div className="my-6">
                <p className="text-2xl font-semibold text-black">Free mint</p>
              </div>
            </div>
            <div className="flex-[0.5] rounded-md">
              <img
                src={getIPFSLink(nftDetails.image)}
                alt=""
                className="w-full h-full object-fill"
              />
            </div>
          </div>
          <Button title="Mint now" onClick={MintNFT} className="my-4" />
        </div>
      </section>
    )
  );
}
