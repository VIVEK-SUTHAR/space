/* eslint-disable @next/next/no-img-element */
import { CampaignContractABI } from "@/config";
import getIPFSLink from "@/utils/getIPFSLink";
import getNFTDetails, { NFTDetails } from "@/utils/getNFTDetails";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useContractRead } from "wagmi";
import Button from "./Button";

function Card({ address }: { address: string }) {
  const [nftDetails, setNftDetails] = useState<NFTDetails | null>(null);
  const { data, error, isLoading } = useContractRead({
    abi: CampaignContractABI,
    address: address as `0x${string}`,
    functionName: "metadataUri",
  });

  const router = useRouter();

  React.useEffect(() => {
    if (data) {
      getNFTDetails(getIPFSLink(data as string))
        .then((res) => setNftDetails(res!))
        .catch((er) => {});
    }
  }, [data]);

  return (
    <div className="h-[22rem] w-full max-w-[330px] lg:max-w-[330px] border-[1px] border-black rounded-md flex flex-col justify-between">
      <div className="rounded-t-md">
        <img
          src={getIPFSLink(nftDetails?.image)}
          alt="img"
          className="w-full max-h-[300px] rounded-t-md"
        />
      </div>
      <div className="h-[173px] rounded-b-xl bg-white p-4 flex flex-col justify-between">
        <div className="flex flex-col justify-center gap-[25px]">
          <div className="flex w-full max-w-[270px] flex-col gap-2 text-start">
            <h1 className="flex text-2xl font-semibold">{nftDetails?.name}</h1>
            <p className="!font-spacemono text-base font-normal leading-[22px]">
              {nftDetails?.description}
            </p>
          </div>
        </div>
        <Button
          title="Mint now"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/nft/${address}`);
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(Card);
