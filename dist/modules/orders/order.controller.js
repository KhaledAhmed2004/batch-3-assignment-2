"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const product_model_1 = require("../products/product.model");
// const createOrder = async (req: Request, res: Response) => {
//   const orderData = req.body;
//   const zodParseData = orderValidationSchema.parse(orderData);
//   const order = await OrderService.createOrder(zodParseData);
//   res.json({
//     success: true,
//     message: "Order created successfully!",
//     data: order,
//   });
// };
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const orderData = req.body;
    const zodParseData = order_validation_1.orderValidationSchema.parse(orderData);
    const product = yield product_model_1.Product.findById(zodParseData.productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }
    if (((_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.quantity) < (orderData === null || orderData === void 0 ? void 0 : orderData.quantity)) {
        return res.status(400).json({
            success: false,
            message: "Insufficient quantity available in inventory",
        });
    }
    product.inventory.quantity =
        ((_b = product === null || product === void 0 ? void 0 : product.inventory) === null || _b === void 0 ? void 0 : _b.quantity) - (zodParseData === null || zodParseData === void 0 ? void 0 : zodParseData.quantity);
    product.inventory.inStock = ((_c = product === null || product === void 0 ? void 0 : product.inventory) === null || _c === void 0 ? void 0 : _c.quantity) > 0 ? true : false;
    yield product.save();
    const order = yield order_service_1.OrderService.createOrder(zodParseData);
    res.json({
        success: true,
        message: "Order created successfully!",
        data: order,
    });
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const result = yield order_service_1.OrderService.getAllOrders(email);
    res.json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
    });
});
exports.OrderController = {
    createOrder,
    getAllOrders,
};
