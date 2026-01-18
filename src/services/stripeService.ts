import { api } from "@/lib/api";

export const stripeService = {
  getStripeInfo: async (token: string): Promise<any> => {
    return api.get("/stripe/admin/stripe-info", token);
  },

  processRefund: async (
    data: { orderId: string; amount: string },
    token: string,
  ): Promise<any> => {
    console.log("payment Refund Data", data);
    return api.post("/payments/refund", data, token);
  },

  createTransfer: async (
    data: { orderId: string; amountCents: number },
    token: string,
  ): Promise<any> => {
    console.log("payment Transfer Data", data);
    return api.post("/payments/create-transfer", data, token);
  },
};
