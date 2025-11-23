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
import { Switch } from "@/components/ui/switch";
import { useOrderDetails } from "@/hooks/useOrders";
import { useRefund } from "@/hooks/useStripe";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Clock, AlertCircle } from "lucide-react";

interface RefundDialogProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundDialog({
  orderId,
  open,
  onOpenChange,
}: RefundDialogProps) {
  const { data: order, isLoading } = useOrderDetails(orderId);
  const refundMutation = useRefund();

  const [manualMode, setManualMode] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");

  // Calculate automatic refund based on time
  const calculateAutoRefund = () => {
    if (!order)
      return {
        refundAmount: 0,
        serviceFeeDeducted: 0,
        percentage: 0,
        rule: "",
        totalPaid: 0,
        bidAmount: 0,
      };

    const totalPaid = parseFloat(order.bid.price);
    const feePercent = order.applicationFeePersen || 0;
    const bidAmount = totalPaid / (1 + feePercent / 100);
    const serviceFee = totalPaid - bidAmount;

    const startTime = new Date(order.bid.service.startTime);
    const now = new Date();
    const hoursUntilStart =
      (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    let refundPercentage = 0;
    let rule = "";

    if (hoursUntilStart > 24) {
      refundPercentage = 100;
      rule = "More than 24 hours before start - Full refund";
    } else if (hoursUntilStart >= 6) {
      refundPercentage = 75;
      rule = "6-24 hours before start - 75% refund";
    } else if (hoursUntilStart > 0) {
      refundPercentage = 50;
      rule = "Less than 6 hours before start - 50% refund";
    } else {
      refundPercentage = 0;
      rule = "After task started - Manual approval only";
    }

    const refundAmount = bidAmount * (refundPercentage / 100);

    return {
      refundAmount,
      serviceFeeDeducted: serviceFee,
      percentage: refundPercentage,
      rule,
      totalPaid,
      bidAmount,
    };
  };

  const autoRefund = calculateAutoRefund();

  // Calculate manual refund
  const calculateManualRefund = () => {
    if (!order) return 0;

    const totalPaid = parseFloat(order.bid.price);
    const feePercent = order.applicationFeePersen || 0;
    const bidAmount = totalPaid / (1 + feePercent / 100);

    if (percentage) {
      return bidAmount * (parseFloat(percentage) / 100);
    } else if (fixedAmount) {
      return parseFloat(fixedAmount);
    } else if (deductionAmount) {
      return bidAmount - parseFloat(deductionAmount);
    }

    return autoRefund.refundAmount;
  };

  const finalRefundAmount = manualMode
    ? calculateManualRefund()
    : autoRefund.refundAmount;

  const handleConfirm = () => {
    if (!orderId) return;

    if (finalRefundAmount <= 0) {
      alert("Refund amount must be greater than $0");
      return;
    }

    const refundData = {
      orderId,
      amount: finalRefundAmount.toFixed(2),
      mode: manualMode ? "Manual" : "Automatic",
      calculation: manualMode
        ? {
            percentage: percentage || null,
            fixedAmount: fixedAmount || null,
            deductionAmount: deductionAmount || null,
          }
        : {
            rule: autoRefund.rule,
            percentage: autoRefund.percentage,
          },
    };

    console.log("🔵 REFUND DEBUG:", refundData);
    alert(
      `Refund Amount: $${finalRefundAmount.toFixed(2)}\n` +
        `Mode: ${refundData.mode}\n` +
        `Order ID: ${orderId}\n\n` +
        `Check console for full details`
    );

    // Uncomment below to actually hit API
    refundMutation.mutate(
      { orderId, amount: finalRefundAmount.toFixed(2) },
      {
        onSuccess: () => {
          onOpenChange(false);
          setManualMode(false);
          setPercentage("");
          setFixedAmount("");
          setDeductionAmount("");
        },
      }
    );

    // Close dialog after debug
    onOpenChange(false);
    setManualMode(false);
    setPercentage("");
    setFixedAmount("");
    setDeductionAmount("");
  };

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setManualMode(false);
      setPercentage("");
      setFixedAmount("");
      setDeductionAmount("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Process Refund</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <DollarSign className="size-4" />
                Payment Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Bid Amount:</span>
                  <span className="ml-2 font-medium">${autoRefund.bidAmount.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Service Fee ({order.applicationFeePersen || 0}%):
                  </span>
                  <span className="ml-2 font-medium">
                    ${autoRefund.serviceFeeDeducted.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Paid:</span>
                  <span className="ml-2 font-medium">
                    ${order.bid.price}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Start Time:</span>
                  <span className="ml-2 font-medium">
                    {order.bid.service.startTime
                      .replace(":00Z", "")
                      .replace("T", " ")}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Automatic Calculation */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="size-4 text-blue-600" />
                Automatic Calculation
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-blue-600" />
                  <span className="text-muted-foreground">
                    {autoRefund.rule}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground">Bid Refund %:</span>
                    <span className="ml-2 font-medium">
                      {autoRefund.percentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bid Refund:</span>
                    <span className="ml-2 font-medium text-blue-600">
                      ${autoRefund.refundAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">
                      Service Fee (Always Deducted):
                    </span>
                    <span className="ml-2 font-medium text-orange-600">
                      ${autoRefund.serviceFeeDeducted.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Manual Override */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="manual-mode" className="font-semibold">
                  Manual Override
                </Label>
                <Switch
                  id="manual-mode"
                  checked={manualMode}
                  onCheckedChange={setManualMode}
                />
              </div>

              {manualMode && (
                <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="percentage">Percentage (%)</Label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="75"
                        value={percentage}
                        onChange={(e) => {
                          setPercentage(e.target.value);
                          setFixedAmount("");
                          setDeductionAmount("");
                        }}
                        disabled={!!fixedAmount || !!deductionAmount}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fixed">Fixed Amount ($)</Label>
                      <Input
                        id="fixed"
                        type="number"
                        placeholder="150"
                        value={fixedAmount}
                        onChange={(e) => {
                          setFixedAmount(e.target.value);
                          setPercentage("");
                          setDeductionAmount("");
                        }}
                        disabled={!!percentage || !!deductionAmount}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deduction">Deduction ($)</Label>
                      <Input
                        id="deduction"
                        type="number"
                        placeholder="50"
                        value={deductionAmount}
                        onChange={(e) => {
                          setDeductionAmount(e.target.value);
                          setPercentage("");
                          setFixedAmount("");
                        }}
                        disabled={!!percentage || !!fixedAmount}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Final Amount */}
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Bid Refund Amount:
                </span>
                <span className="font-medium">
                  ${finalRefundAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Service Fee Deducted:
                </span>
                <span className="font-medium text-orange-600">
                  -${autoRefund.serviceFeeDeducted.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">
                  Total Refund to Customer:
                </span>
                <span className="font-bold text-2xl text-green-600">
                  ${finalRefundAmount.toFixed(2)}
                </span>
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
              refundMutation.isPending || !order || finalRefundAmount <= 0
            }
          >
            {refundMutation.isPending ? "Processing..." : "Confirm Refund"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
