# Order Refund & Transfer Logic Documentation

## Overview
This document explains the complete refund and transfer logic implemented in the orders management system. The system handles payment processing for service orders with automatic and manual refund calculations, as well as transfer payments to service providers.

## System Architecture

### Key Components
- **Orders Page**: Main interface for managing orders
- **RefundDialog**: Handles refund calculations and processing
- **TransferDialog**: Manages payment transfers to service providers
- **Stripe Integration**: Payment processing backend

### API Endpoints
- `GET /admin/all-orders` - Fetch all orders
- `GET /admin/order-details/{orderId}` - Get specific order details
- `POST /payments/refund` - Process refund
- `POST /payments/create-transfer` - Create transfer to service provider

---

## Refund Logic

### When Refunds Are Available
Refunds are only available for orders with status `IN_PROGRESS`. The system shows a "Refund" button in the actions column for these orders.

### Payment Structure
Every order has the following payment structure:
```
Total Paid = Bid Amount + Service Fee
Service Fee = Bid Amount × Application Fee Percentage
```

**Example:**
- Bid Amount: $100
- Application Fee: 15%
- Service Fee: $15
- Total Paid: $115

### Automatic Refund Calculation

The system calculates refunds automatically based on **time until service start**:

#### Time-Based Refund Rules
1. **More than 24 hours before start**: 100% refund of bid amount
2. **6-24 hours before start**: 75% refund of bid amount
3. **Less than 6 hours before start**: 50% refund of bid amount
4. **After task started**: 0% refund (manual approval only)

#### Calculation Logic
```javascript
const startTime = new Date(order.bid.service.startTime);
const now = new Date();
const hoursUntilStart = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

let refundPercentage = 0;
if (hoursUntilStart > 24) {
  refundPercentage = 100;
} else if (hoursUntilStart >= 6) {
  refundPercentage = 75;
} else if (hoursUntilStart > 0) {
  refundPercentage = 50;
} else {
  refundPercentage = 0; // Manual only
}

const refundAmount = bidAmount * (refundPercentage / 100);
```

### Manual Refund Override

Admins can override automatic calculations using three methods:

#### 1. Percentage-Based
- Input: Percentage (0-100%)
- Calculation: `bidAmount × (percentage / 100)`
- Example: 80% of $100 = $80

#### 2. Fixed Amount
- Input: Dollar amount
- Calculation: Direct amount
- Example: Fixed $75 refund

#### 3. Deduction-Based
- Input: Deduction amount
- Calculation: `bidAmount - deductionAmount`
- Example: $100 - $25 = $75 refund

### Important Refund Rules
- **Service fees are NEVER refunded** (always deducted)
- Only the bid amount is eligible for refund
- Refund amount cannot exceed the original bid amount
- Minimum refund amount is $0.01

### Test Cases

#### Case 1: Full Refund (>24 hours)
```
Order Details:
- Bid Amount: $100
- Service Fee (15%): $15
- Total Paid: $115
- Time until start: 30 hours

Result:
- Refund Percentage: 100%
- Bid Refund: $100
- Service Fee Deducted: $15
- Total Refund to Customer: $100
```

#### Case 2: Partial Refund (6-24 hours)
```
Order Details:
- Bid Amount: $200
- Service Fee (10%): $20
- Total Paid: $220
- Time until start: 12 hours

Result:
- Refund Percentage: 75%
- Bid Refund: $150
- Service Fee Deducted: $20
- Total Refund to Customer: $150
```

#### Case 3: Manual Override
```
Order Details:
- Bid Amount: $150
- Service Fee (15%): $22.50
- Total Paid: $172.50
- Manual: 60% refund

Result:
- Manual Percentage: 60%
- Bid Refund: $90
- Service Fee Deducted: $22.50
- Total Refund to Customer: $90
```

---

## Transfer Logic

### When Transfers Are Available
Transfers are available for orders with status `IN_PROGRESS`. The system shows a "Transfer" button in the actions column.

### Transfer Calculation

#### Payment Flow
```
Total Paid → Bid Amount → Platform Fee Deduction → Transfer Amount
```

#### Calculation Steps
1. **Extract Bid Amount**: Remove application fee from total paid
2. **Calculate Platform Fee**: Apply platform fee percentage to bid amount
3. **Calculate Transfer**: Subtract platform fee from bid amount

```javascript
const totalPaid = parseFloat(order.bid.price);
const applicationFeePercent = order.applicationFeePersen || 0;
const bidAmount = totalPaid / (1 + applicationFeePercent / 100);

const platformFeePercent = parseFloat(platformFeePercent) || 15;
const platformFee = bidAmount * (platformFeePercent / 100);
const transferAmount = bidAmount - platformFee;
const amountCents = Math.round(transferAmount * 100);
```

### Platform Fee Management
- Default platform fee: 15% (configurable)
- Admin can adjust platform fee percentage before transfer
- Platform fee is deducted from bid amount, not total paid
- Transfer amount is converted to cents for Stripe API

### Transfer Requirements
- Order must be in `IN_PROGRESS` status
- Admin must confirm the transfer (checkbox)
- Transfer amount must be greater than $0
- Service provider must have valid Stripe account

### Test Cases

#### Case 1: Standard Transfer
```
Order Details:
- Total Paid: $115
- Application Fee: 15%
- Bid Amount: $100
- Platform Fee: 15%

Calculation:
- Bid Amount: $115 ÷ 1.15 = $100
- Platform Fee: $100 × 15% = $15
- Transfer Amount: $100 - $15 = $85
- Amount in Cents: 8500

Result:
- Service Provider Receives: $85
- Platform Keeps: $15 (platform fee) + $15 (application fee) = $30
```

#### Case 2: Custom Platform Fee
```
Order Details:
- Total Paid: $220
- Application Fee: 10%
- Bid Amount: $200
- Platform Fee: 20% (custom)

Calculation:
- Bid Amount: $220 ÷ 1.10 = $200
- Platform Fee: $200 × 20% = $40
- Transfer Amount: $200 - $40 = $160
- Amount in Cents: 16000

Result:
- Service Provider Receives: $160
- Platform Keeps: $40 (platform fee) + $20 (application fee) = $60
```

---

## Payment Status Logic

### Status Display Rules
The system shows payment status badges based on order status:

```javascript
const getPaymentStatusBadge = (orderStatus) => {
  if (orderStatus === "CANCELLED") {
    return "Refund"; // Orange badge
  }
  if (orderStatus === "COMPLETED") {
    return "Transfer"; // Green badge
  }
  return "Pending"; // Gray badge
};
```

### Order Status Flow
1. **PENDING**: Order created, payment pending
2. **IN_PROGRESS**: Payment captured, service in progress
3. **COMPLETED**: Service completed, ready for transfer
4. **CANCELLED**: Order cancelled, eligible for refund

---

## Error Handling

### Refund Errors
- Invalid order ID
- Order not eligible for refund
- Refund amount exceeds bid amount
- Stripe API errors
- Network connectivity issues

### Transfer Errors
- Invalid service provider Stripe account
- Insufficient platform balance
- Transfer amount too small (minimum $0.50)
- Stripe API rate limits
- Invalid amount format

### User Feedback
- Success: Toast notification with confirmation
- Error: Toast notification with specific error message
- Loading: Button shows "Processing..." state
- Validation: Real-time form validation

---

## Security Considerations

### Authorization
- All operations require admin authentication token
- Order access validated by user permissions
- Stripe operations use secure API keys

### Data Validation
- Amount validation (positive numbers only)
- Order status verification before operations
- Service provider account verification
- Input sanitization for all user inputs

### Audit Trail
- All refund/transfer operations logged
- Order status changes tracked
- Payment processing events recorded
- Admin action attribution

---

## Integration Points

### Stripe Integration
- Refunds: Uses Stripe Refund API
- Transfers: Uses Stripe Transfer API
- Account verification for service providers
- Webhook handling for payment events

### Database Updates
- Order status changes
- Payment transaction records
- Refund/transfer history
- User balance updates

### Notification System
- Email notifications to customers
- SMS alerts for service providers
- Admin dashboard updates
- Real-time status updates

---

## Future Enhancements

### Planned Features
1. **Partial Refunds**: Allow refunding specific line items
2. **Scheduled Transfers**: Automatic transfers based on completion
3. **Dispute Management**: Handle payment disputes
4. **Multi-currency Support**: Support for different currencies
5. **Bulk Operations**: Process multiple refunds/transfers
6. **Advanced Analytics**: Payment processing metrics

### Technical Improvements
1. **Caching**: Cache order details for better performance
2. **Retry Logic**: Automatic retry for failed operations
3. **Rate Limiting**: Prevent abuse of payment operations
4. **Real-time Updates**: WebSocket integration for live updates
5. **Mobile Optimization**: Better mobile experience for admins

---

## Troubleshooting

### Common Issues
1. **Refund Failed**: Check Stripe account balance and API keys
2. **Transfer Delayed**: Verify service provider Stripe account status
3. **Amount Mismatch**: Ensure proper fee calculations
4. **Status Not Updating**: Check webhook configuration
5. **Permission Denied**: Verify admin authentication token

### Debug Information
- All operations log detailed information to console
- Error messages include specific failure reasons
- Order details include all relevant payment information
- Stripe transaction IDs tracked for reference

---

*Last Updated: January 2026*
*Version: 1.0*