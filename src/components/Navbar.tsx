"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function Navbar() {
  const router = useRouter();
  const { isConnected } = useAccount();
  return (
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-between pt-6 -m-2">
        <div className="w-auto p-2">
          <div className="flex flex-wrap items-center">
            <div className="w-auto">
              <a className="relative z-10 inline-block text-black" href="/">
                Space
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          {isConnected && (
            <Button
              className="w-48"
              title="Create campaign"
              onClick={(e) => {
                router.push("/create");
              }}
            />
          )}
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
