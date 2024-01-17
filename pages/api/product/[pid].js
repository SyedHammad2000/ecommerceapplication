import Topic from "@/Schema/ProductSchema";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  switch (req.method) {
    case "GET":
      await GetProduct(req,res);
      break;
    case "DELETE":
      await DeleteProduct(req,res);
      break;
  }
}

const GetProduct = async (req, res) => {
  const { pid } = await req.query;
  const product = await Topic.findOne({ _id: pid });

  res.status(200).json(product);
};
const DeleteProduct = async (req, res) => {
  const { pid } = await req.query;
   await Topic.findByIdAndDelete({ _id: pid });
  res.status(200).json({});
};
