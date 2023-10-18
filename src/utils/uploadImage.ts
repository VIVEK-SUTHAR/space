
const IPFS_UPLOAD_API = "https://api.web3.storage/upload";

const TOKEN = process.env.NEXT_PUBLIC_IPFS_API_KEY;

const uploadImageToIPFS = async (
  imageBlob: File | undefined
): Promise<string> => {
  try {
    const headersList = {
      Authorization: `Bearer ${TOKEN}`,
    };
    // console.log(headersList);
    const filehash = await fetch(IPFS_UPLOAD_API, {
      method: "POST",
      headers: headersList,
      body: imageBlob,
    });
    const data = await filehash.json();
    return data.cid;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in uploading image..");
    }
    throw new Error("Something went wrong");
  }
};
export default uploadImageToIPFS;
