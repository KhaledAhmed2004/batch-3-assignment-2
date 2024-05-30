import { TOrder } from "./order.interface";
import { Order } from "./order.modle";

const createOrder = async (payLoad: TOrder) => {
  const create = await Order.create(payLoad);
  return create;
};

const getAllOrders = async (email?: string) => {
  if (email) {
    return await Order.find({ email: { $regex: email, $options: "i" } });
  } else {
    return await Order.find();
  }
};

export const OrderService = { createOrder, getAllOrders };
