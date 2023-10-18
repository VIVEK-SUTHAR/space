"use client";
import Button from "@/components/Button";
import InputSVG from "@/components/InputSVG";
import { CampaignFactoryABI, CampaignFactoryAddress } from "@/config";
import uploadImageToIPFS from "@/utils/uploadImage";
import uploadMetadataToIPFS from "@/utils/uploadMetadata";
import { providers, Contract } from "ethers";
import Image from "next/image";
import { useState } from "react";
import { Id, toast } from "react-toastify";
type CampaignDetails = {
  collectionname: string | null;
  title: string | null;
  description: string | null;
  totalSupply: number;
};

export default function Create() {
  const [image, setImage] = useState<File | null>(null);
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
    description: null,
    title: null,
    totalSupply: 100,
    collectionname: null,
  });
  const [isCreating, setIsCreating] = useState(false);
  let toastPromise: Id;

  const handleImageUpload = async () => {
    setIsCreating(true);
    try {
      if (isCreating) return;
      if (!image) {
        toast.error("Please provide the image !");
        return;
      }
      const toastPromise = toast.loading("Uploading NFT Image....");

      const hash = await uploadImageToIPFS(image);
      // console.log("Image cid", hash);

      const metadata = {
        description: campaignDetails.description,
        external_url: `ipfs://${hash}`,
        image: `ipfs://${hash}`,
        name: campaignDetails.title,
        attributes: [
          { trait_type: "total_supply", value: campaignDetails.totalSupply },
          {
            trait_type: "collection_name",
            value: campaignDetails.collectionname,
          },
        ],
      };
      const metadatahash = await uploadMetadataToIPFS(JSON.stringify(metadata));

      // console.log("metadata uri", metadatahash);

      toast.update(toastPromise, {
        render: "Check your wallet",
        type: "success",
        isLoading: true,
      });
      //@ts-expect-error
      const provider = new providers.Web3Provider(window.ethereum);
      const contract = new Contract(
        CampaignFactoryAddress,
        CampaignFactoryABI,
        provider.getSigner()
      );
      const result = await contract.createCampaign(
        campaignDetails.title,
        campaignDetails.description,
        `ipfs://${hash}`,
        `ipfs://${metadatahash}`,
        campaignDetails.totalSupply
      );
      // console.log(result);
      toast.update(toastPromise, {
        render: "Campaign created!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastPromise, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      // console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="py-8 my-12">
      <h3 className="text-2xl text-center font-bold tracking-wide text-black mb-1">
        Create your own NFT campaign
      </h3>
      <div className="container">
        <div className="flex flex-wrap flex-row-reverse -mx-4 mb-8">
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="mt-8">
              <p className="text-xs text-black">
                Select the Image for your Campaign NFT
              </p>
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  height={500}
                  width={500}
                  style={{ objectFit: "cover" }}
                  alt={""}
                  className="rounded-md my-4"
                />
              ) : (
                <div className="w-full py-8 px-4 text-center border-dashed border border-black rounded-lg">
                  <div className="relative group h-14 w-14 mx-auto mb-4">
                    <InputSVG />
                    <input
                      className="absolute top-0 left-0 h-14 w-14 opacity-0"
                      id="formInput2-6"
                      type="file"
                      name="filephoto"
                      onChange={(e) => {
                        e.preventDefault();
                        if (e.target.files && e.target.files.length > 0) {
                          setImage(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  <p className="font-semibold leading-normal mb-1">
                    <span className="text-blue-500">
                      Click to upload a file
                    </span>
                    <span className="text-black mx-2">or drag and drop</span>
                  </p>
                  <span className="text-xs text-blackfont-semibold">
                    PNG, JPG, GIF or up to 10MB
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-auto px-4">
            <div className="px-8 md:px-16 pt-16 pb-8 bg-transparent rounded-xl">
              <div className="max-w-xl">
                <form>
                  <div className="flex flex-wrap -mx-4 -mb-10">
                    <div className="w-full  px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-black rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-black px-1 bg-white">
                          NFT Collection Name
                        </span>
                        <input
                          className="block w-full outline-none bg-transparent text-black placeholder-gray-500 font-semibold"
                          id="formInput2-1"
                          type="text"
                          placeholder="What should be your Collection's name?"
                          onChange={(e) => {
                            e.preventDefault();
                            setCampaignDetails((prev) => ({
                              ...prev,
                              collectionname: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 mb-10">
                      <div className="relative w-full h-14 py-4 px-3 border border-black rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-black px-1 bg-white">
                          Campaign Title
                        </span>
                        <input
                          className="block w-full outline-none bg-transparent text-black placeholder-gray-500 font-semibold"
                          id="formInput2-2"
                          type="text"
                          placeholder="What's your campaign name?"
                          onChange={(e) => {
                            e.preventDefault();
                            setCampaignDetails((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 mb-10">
                      <div className="relative w-full py-4 px-3 border border-black rounded-lg">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-black px-1 bg-white">
                          Campaign Description
                        </span>
                        <textarea
                          className="block w-full outline-none bg-transparent placeholder-gray-500 text-black font-semibold resize-none"
                          id="formInput2-5"
                          name=""
                          placeholder="What describes your campaign?"
                          cols={20}
                          rows={5}
                          onChange={(e) => {
                            e.preventDefault();
                            setCampaignDetails((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-8 text-right">
                  <Button
                    title={
                      isCreating ? "Creating campaign" : "Create your campaign"
                    }
                    onClick={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
