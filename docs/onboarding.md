# 🧾 Distributor Tour Booking & Payment Flow – Developer Guide

## 📌 Overview
This document describes the technical flow for the booking and payment process on the distributor widget, including user interaction, API integration, and Paystack payment verification.

---

## 🧩 System Components

| Component                  | Description                                                              |
|----------------------------|--------------------------------------------------------------------------|
| `DistributorBookingWidget`| Lists distributor-specific tours with adjusted pricing (`PricingRule`)   |
| `TourBookingForm`          | Form where users input booking details                                    |
| `initializePayment` API    | Backend endpoint to create booking and start Paystack payment flow        |
| `verifyPayment` API        | Backend endpoint to confirm payment status after Paystack redirects       |
| `PaymentSuccess` Page      | Frontend page that handles post-payment verification and redirect         |
| `PricingRule` Model        | Stores custom distributor pricing rules linked to packages                |

---

## 🧭 Booking and Payment Flow

### 1. Tour Display
- Tours shown in `DistributorBookingWidget` are pulled using:

GET `/api/widget/:distributorId`

```csharp
- Price is fetched from `PricingRule.finalPrice`.

**Frontend Object Example:**
```js
{
id: "...",  // Tour ID
title: "...",
description: "...",
price: 40000, // Final price from PricingRule
currency: "₦",
bookingUrl: `/book/${tourId}?distributor=${distributorId}`
}
```

### 2. Booking Form
- Accessed via booking URL.

- Captures:
Name

Email

Phone

Travel date

Travelers count

- Uses tourId and distributorId for pricing and booking.

### 3. Initialize Payment
**Endpoint:**

```bash
POST /api/payment/initialize
```

**Payload:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "2348012345678",
  "date": "2025-08-10",
  "travelers": 1,
  "tourId": "<tour_id>",
  "distributorId": "<distributor_id>"
}
```

**Behavior:**

- Validates active PricingRule.
- Creates a booking (status: pending).
- Initializes Paystack transaction with finalPrice * 100.
- Returns Paystack payment link.

**Response:**

```json
{
  "authUrl": "https://paystack.com/pay/..."
}
```

### 4. Redirect from Paystack
After successful payment, Paystack redirects to:

```bash
http://localhost:3001/payment-success?reference=<paystack_reference>
```

### 5. Payment Verification
Frontend Component: `PaymentSuccess.jsx`

- Extracts reference from URL.
- Calls:

```bash
GET /api/payment/verify?reference=<reference>
```

**Backend Logic:**

- Confirms payment with Paystack API.
- Updates booking status to confirmed.

**Frontend Behavior:**

- Shows status messages:

    - Verifying…

    - Success ✅

    - Failed ❌

- Redirects after 5 seconds (customizable).

### 🔁 Booking Status Lifecycle
|Step	|Component/API	|Status|
|-------|---------------|------|
|Booking submitted	|Backend API	|`pending`|
|Payment initialized	|Paystack	|`incomplete`|
|Redirect from Paystack	|Frontend	|`verifying`|
|Payment verified	|Backend API	|`confirmed`|
|UI redirect after verify	|Frontend	|–|

### 🔐 Security Notes
- Never expose PAYSTACK_SECRET_KEY to frontend.
- Use HTTPS and production domain in callback_url.
- Validate that pricing rule belongs to requesting distributor.

### 🧪 Common Issues & Fixes
|Problem                                 |Fix                                                  |
|----------------------------------------|-----------------------------------------------------|
|Redirect shows `localhost refused` error	 |Ensure frontend is on correct port (e.g., `:3001`)     |
|Payment not verified	                 |Confirm `verifyPayment` API correctly matches `reference`|
|Pricing mismatch	                     |Only fetch prices from `PricingRule.finalPrice`        |

### ✅ Environment Setup
`.env` (Backend)
```ini
PORT=5000
MONGO_URI=mongodb+srv://...
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
```

### 🛠️ Key Files
|File	                                     |Purpose                                      |
|--------------------------------------------|---------------------------------------------|
|`frontend/components/PaymentSuccess.jsx`	     |Verifies payment and shows status            |
|`backend/controllers/payment.controller.js`	 |Handles payment initialization and verification |
|`backend/models/pricingRule.model.js`	     |Defines distributor price rules                |
|`backend/models/booking.model.js`	         |Stores booking info|
|`backend/routes/payment.routes.js`	         |API routes for payment actions|

### 📦 Optional Enhancements
- Email confirmation after successful booking
-Distributor dashboard for tracking bookings
- Admin panel for managing pricing rules
- Multiple payment options

### 🧠 TL;DR for New Devs
- The price for a booking comes from PricingRule, not the tour package.
- Bookings are created with status pending, then confirmed via verifyPayment.
- Paystack handles the payment, and redirects to payment-success on your frontend.
- Your backend is responsible for verifying the transaction with Paystack’s API.

### 📣 Questions?
Reach out to the [previous dev](mercyoyelude2@gmail.com) or check Paystack’s docs for:

```bash
https://paystack.com/docs/payments/accept-payments
```