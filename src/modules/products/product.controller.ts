import { Request, Response } from "express";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";
import { z } from "zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductService.createProduct(zodParseData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  const result = await ProductService.getAllProducts(searchTerm as string);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.getSingleProduct(productId);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updatedDate = req.body;
  const result = await ProductService.updateProduct(productId, updatedDate);
  res.json({
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
};
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.deleteProduct(productId);
  res.json({
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
};
export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
