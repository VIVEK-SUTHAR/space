/**
 *
 * @param url unformatted url containing ipfs hash
 * @returns https accessable URL
 * @supports Filecoin,IPFS,Arweave CID
 */

const ARWEAVE_GATEWAY = "httpps://arweave.net/";
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const getIPFSLink = (url: string | undefined): string => {
  const LINK = url?.includes(ARWEAVE_GATEWAY)
    ? url
    : url?.includes("ipfs://")
      ? `${IPFS_GATEWAY}${url?.split("//")[1]}`
      : url?.includes("ar://")
        ? `${ARWEAVE_GATEWAY}/${url?.split("ar://")[1]}`
        : url;
  return LINK || "";
};
export default getIPFSLink;
