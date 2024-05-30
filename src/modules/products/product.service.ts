import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payLoad: TProduct) => {
  const result = await Product.create(payLoad);
  return result;
};

const getAllProducts = async (searchTerm?: string) => {
  if (searchTerm) {
    return await Product.find({ name: { $regex: searchTerm, $options: "i" } });
  } else {
    return await Product.find();
  }
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateProduct = async (id: string, updatedData: TProduct) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true }
  );
  return result;
};
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
