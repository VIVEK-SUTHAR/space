"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";
import { APP_DESC, CTA } from "@/config/app";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="overflow-hidden min-h-[calc(100vh-70px)]">
      <div className="relative min-h-[calc(100vh-70px)] flex items-center">
        <div className="relative z-10 container px-4 mx-auto">
          <div className="relative text-center md:max-w-4xl mx-auto">
            <h1 className="mb-10 text-7xl lg:text-8xl xl:text-10xl text-black tracking-tighter">
              {CTA}
            </h1>
            <h2 className="mb-10 text-xl text-gray-700 tracking-tighter">
              {APP_DESC}
            </h2>
            <Button
              title="Explore campaigns"
              className="w-44"
              onClick={() => {
                router.push("/feed");
              }}
            />
          </div>
          <div className="relative max-w-max mx-auto">
            <img src="nightsable-assets/images/headers/card-half.png" alt="" />
            <img
              className="absolute top-7 -right-64"
              src="https://static.shuffle.dev/components/preview/5ea0a962-b8d0-47f5-bcf4-9267b70a0086/assets/public/nightsable-assets/images/headers/star.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
