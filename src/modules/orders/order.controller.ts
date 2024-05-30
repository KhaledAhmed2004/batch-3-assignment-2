import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";
import { Product } from "../products/product.model";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  const zodParseData = orderValidationSchema.parse(orderData);
  const product = await Product.findById(zodParseData.productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  if (product?.inventory?.quantity < orderData?.quantity) {
    return res.status(400).json({
      success: false,
      message: "Insufficient quantity available in inventory",
    });
  }
  product.inventory.quantity =
    product?.inventory?.quantity - zodParseData?.quantity;
  product.inventory.inStock = product?.inventory?.quantity > 0 ? true : false;
  await product.save();

  const order = await OrderService.createOrder(zodParseData);
  res.json({
    success: true,
    message: "Order created successfully!",
    data: order,
  });
};

const getAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await OrderService.getAllOrders(email as string);
  res.json({
    success: true,
    message: "Orders fetched successfully!",
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
