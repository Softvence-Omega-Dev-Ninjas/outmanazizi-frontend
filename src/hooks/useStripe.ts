import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stripeService } from "@/services/stripeService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function useStripeInfo() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["stripe-info"],
    queryFn: async () => {
      if (!token) throw new Error("No token");
      const response = await stripeService.getStripeInfo(token);
      return response;
    },
    enabled: !!token,
  });
}

export function useRefund() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { orderId: string; amount: string }) => {
      if (!token) throw new Error("No token");
      return stripeService.processRefund(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Refund processed successfully");
    },
    onError: (error: any) => {
      const errorMessage = error?.error || "Failed to process refund";
      toast.error(errorMessage);
    },
  });
}

export function useTransfer() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { orderId: string; amountCents: number }) => {
      if (!token) throw new Error("No token");
      return stripeService.createTransfer(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Transfer completed successfully");
    },
    onError: (error: any) => {
      const errorMessage = error?.error || "Failed to complete transfer";
      toast.error(errorMessage);
    },
  });
}
