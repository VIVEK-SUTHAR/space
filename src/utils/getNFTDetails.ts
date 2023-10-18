type Attribute = {
  trait_type: string;
  value: any;
};

export type NFTDetails = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: Array<Attribute>;
};

async function getNFTDetails(httpurl: string): Promise<NFTDetails | undefined> {
  try {
    const res = await fetch(httpurl);
    if (res.ok) {
      return res.json();
    }
  } catch (er) {
    throw new Error("Failed to fetch the data");
  }
}

export default getNFTDetails