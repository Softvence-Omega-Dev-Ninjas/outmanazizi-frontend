"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useOrderDetails } from "@/hooks/useOrders";
import { useTransfer } from "@/hooks/useStripe";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, User, ArrowRightLeft } from "lucide-react";
import { usePlatformFee } from "@/hooks/usePlatformFee";

interface TransferDialogProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferDialog({
  orderId,
  open,
  onOpenChange,
}: TransferDialogProps) {
  const { data: order, isLoading } = useOrderDetails(orderId);
  const transferMutation = useTransfer();
  const { platformFee } = usePlatformFee();

  const [platformFeePercent, setPlatformFeePercent] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Set default platform fee when it loads
  useEffect(() => {
    if (platformFee?.amount && !platformFeePercent) {
      setPlatformFeePercent(platformFee.amount.toString());
    }
  }, [platformFee, platformFeePercent]);

  // Calculate transfer amount
  const calculateTransfer = () => {
    if (!order)
      return {
        bidAmount: 0,
        platformFee: 0,
        transferAmount: 0,
        amountCents: 0,
      };

    const bidAmount = parseFloat(order.bid.price);
    const feePercent = parseFloat(platformFeePercent) || 0;
    const platformFee = bidAmount * (feePercent / 100);
    const transferAmount = bidAmount - platformFee;
    const amountCents = Math.round(transferAmount * 100);

    return { bidAmount, platformFee, transferAmount, amountCents };
  };

  const transfer = calculateTransfer();

  const handleConfirm = () => {
    if (!orderId || !confirmed) return;

    if (transfer.transferAmount <= 0) {
      alert("Transfer amount must be greater than $0");
      return;
    }

    const transferData = {
      orderId,
      amountCents: transfer.amountCents,
      amountDollars: transfer.transferAmount.toFixed(2),
      bidAmount: transfer.bidAmount.toFixed(2),
      platformFeePercent: parseFloat(platformFeePercent || "0"),
      platformFeeAmount: transfer.platformFee.toFixed(2),
      serviceProvider: {
        name: order?.bid.serviceProvider.user.name,
        email: order?.bid.serviceProvider.user.email,
        id: order?.serviceProviderId,
      },
    };

    console.log("🟢 TRANSFER DEBUG:", transferData);
    alert(
      `Transfer Amount: $${transfer.transferAmount.toFixed(2)}\n` +
        `Amount in Cents: ${transfer.amountCents}\n` +
        `Platform Fee: ${platformFeePercent}% ($${transfer.platformFee.toFixed(
          2
        )})\n` +
        `Service Provider: ${order?.bid.serviceProvider.user.name}\n` +
        `Order ID: ${orderId}\n\n` +
        `Check console for full details`
    );

    // Uncomment below to actually hit API
    transferMutation.mutate(
      { orderId, amountCents: transfer.amountCents },
      {
        onSuccess: () => {
          onOpenChange(false);
          setPlatformFeePercent("15");
          setConfirmed(false);
        },
      }
    );

    // Close dialog after debug
    onOpenChange(false);
    setPlatformFeePercent(platformFee?.amount?.toString() || "15");
    setConfirmed(false);
  };

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setPlatformFeePercent(platformFee?.amount?.toString() || "15");
      setConfirmed(false);
    }
  }, [open, platformFee]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transfer Payment</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Service Provider Info */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="size-4" />
                Service Provider
              </h3>
              <div className="flex items-center gap-3">
                {order.bid.serviceProvider.user.picture && (
                  <img
                    src={order.bid.serviceProvider.user.picture}
                    alt={order.bid.serviceProvider.user.name}
                    className="size-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">
                    {order.bid.serviceProvider.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.bid.serviceProvider.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    ID: {order.serviceProviderId.slice(0, 16)}...
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Calculation */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <DollarSign className="size-4 text-blue-600" />
                Payment Calculation
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bid Amount:</span>
                  <span className="font-medium">
                    ${transfer.bidAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="platform-fee"
                    className="text-sm text-muted-foreground"
                  >
                    Platform Fee:
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="platform-fee"
                      type="number"
                      value={platformFeePercent}
                      onChange={(e) => setPlatformFeePercent(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <span className="font-medium ml-auto">
                    ${transfer.platformFee.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Transfer Amount:</span>
                  <span className="font-bold text-lg text-green-600">
                    ${transfer.transferAmount.toFixed(2)}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Amount in cents: {transfer.amountCents}
                </div>
              </div>
            </div>

            <Separator />

            {/* Confirmation */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) =>
                    setConfirmed(checked as boolean)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="confirm"
                    className="font-medium cursor-pointer"
                  >
                    I confirm this transfer
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    This will transfer ${transfer.transferAmount.toFixed(2)} to
                    the service provider's account. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No order details found
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              transferMutation.isPending ||
              !order ||
              !confirmed ||
              transfer.transferAmount <= 0
            }
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowRightLeft className="mr-2 size-4" />
            {transferMutation.isPending ? "Processing..." : "Confirm Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
