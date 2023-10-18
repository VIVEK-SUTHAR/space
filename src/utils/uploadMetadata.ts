const IPFS_UPLOAD_API = "https://api.web3.storage/upload";

const TOKEN = process.env.NEXT_PUBLIC_IPFS_API_KEY;

async function uploadMetadataToIPFS(data: string) {
  try {
    const headersList = {
      Authorization: `Bearer ${TOKEN}`,
    };
    // console.log(headersList);
    const filehash = await fetch(IPFS_UPLOAD_API, {
      method: "POST",
      headers: headersList,
      body: data,
    });
    const uploadResult = await filehash.json();
    return uploadResult.cid;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in uploading metadata..");
    }
    throw new Error("Something went wrong");
  }
}
export default uploadMetadataToIPFS
