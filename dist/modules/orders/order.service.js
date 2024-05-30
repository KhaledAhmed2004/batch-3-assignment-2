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
exports.OrderService = void 0;
const order_modle_1 = require("./order.modle");
const createOrder = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield order_modle_1.Order.create(payLoad);
    return create;
});
const getAllOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield order_modle_1.Order.find({ email: { $regex: email, $options: "i" } });
    }
    else {
        return yield order_modle_1.Order.find();
    }
});
exports.OrderService = { createOrder, getAllOrders };
