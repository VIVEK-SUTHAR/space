"use client";

import Card from "@/components/Card";
import { CampaignFactoryABI, CampaignFactoryAddress } from "@/config";
import React from "react";
import { useContractRead } from "wagmi";

export default function Feed() {
  const { data, error, isLoading } = useContractRead({
    abi: CampaignFactoryABI,
    address: CampaignFactoryAddress,
    functionName: "getDeployedCampaigns",
  });
  return (
    <div className="container mx-auto flex items-center gap-10 my-10 flex-wrap p-10">
      {data ? (
        <>
          {data?.map((address: string) => (
            <Card key={address} address={address} />
          ))}
        </>
      ) : null}
    </div>
  );
}
