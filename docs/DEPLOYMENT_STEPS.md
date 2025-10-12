# Payment Integration Deployment Steps

## Backend Setup

### 1. Database Migration Status
✅ **COMPLETED** - All tables and columns have been created automatically by TypeORM!

The database now contains:
- ✅ `payment_plans` table with all required columns
- ✅ `payment_proofs` table 
- ✅ `bookings` table updated with `paidAmount` and `pendingAmount` columns
- ✅ `payment_schedules` table updated with `paymentPlanId` column

**Note**: If you encounter migration errors in the future, the tables likely already exist from TypeORM auto-creation.

### 2. Backend Server Status
✅ **RUNNING** - All dependency injection issues resolved!

The server should now be running without errors. If you see any issues:
```bash
# Stop the current server (Ctrl+C)
npm run start:dev
```

### 3. Verify New API Endpoints
After restart, these endpoints should be available:
- `GET /api/v1/payment-plans` - Payment plans management
- `GET /api/v1/payment-plans/active` - Active payment plans
- `POST /api/v1/bookings/:id/payments` - Add manual payments
- `GET /api/v1/bookings/:id/payments/summary` - Payment summary

## Frontend Setup

### 1. Restart Frontend Development Server
```bash
cd frontend
# Stop the current server (Ctrl+C)
npm run dev
```

### 2. Clear Browser Cache
- Hard refresh (Ctrl+Shift+R) or clear browser cache
- This ensures new components are loaded properly

## New Features Available

### 1. Payment Plans Management
- Navigate to: **Payments > Payment Plans**
- URL: `http://localhost:3000/dashboard/payment-plans`
- Features:
  - Create/edit payment plans
  - Configure plot size and pricing
  - Set monthly/quarterly/bi-yearly payments
  - Manage plan status (active/inactive)

### 2. Enhanced Booking Form
- Navigate to: **Bookings > New Booking**
- URL: `http://localhost:3000/dashboard/bookings/new`
- New features:
  - Payment plan selection dropdown
  - Initial payment field (can be 0)
  - Real-time pending amount calculation
  - Payment plan details preview

### 3. Booking Payment Management
- Navigate to any booking: **Bookings > All Bookings > View**
- URL: `http://localhost:3000/dashboard/bookings/view/[booking-id]`
- New features:
  - Payment summary cards
  - Add manual payments
  - Upload payment proofs
  - Complete payment history

## Troubleshooting

### If Payment Plans Page Shows 404
1. Ensure frontend server restarted
2. Check browser URL: `/dashboard/payment-plans`
3. Clear browser cache

### If API Calls Fail
1. Ensure backend server restarted
2. Check browser console for errors
3. Verify migration ran successfully

### If Booking Form Doesn't Show New Fields
1. Hard refresh the page (Ctrl+Shift+R)
2. Check if payment plans API is working: `/api/v1/payment-plans/active`

### If Payment Management Not Visible in Booking Details
1. Ensure you're viewing an existing booking
2. Check browser console for component errors
3. Verify BookingPaymentManager component is imported

## Testing the Integration

### 1. Create a Payment Plan
1. Go to Payment Plans page
2. Click "Add Payment Plan"
3. Fill in details for a 5 Marla plot
4. Save and verify it appears in the list

### 2. Create a Booking with New System
1. Go to New Booking page
2. Select customer and plot
3. Choose the payment plan you created
4. Set initial payment to 0 or any amount
5. Save booking

### 3. Add Manual Payment
1. View the booking you just created
2. Scroll down to Payment Management section
3. Click "Add Payment"
4. Fill in payment details
5. Upload a payment proof (image/PDF)

### 4. Verify Integration
1. Check that paid amount updates in booking summary
2. Verify pending amount decreases
3. Confirm payment appears in history
4. Test payment proof upload/view

## Common Issues

### Migration Errors
If migration fails:
```bash
cd backend
npm run migration:revert
npm run migration:run
```

### Import Errors
If components don't load:
1. Check file paths in imports
2. Ensure all new files are saved
3. Restart TypeScript service in VS Code

### API Permission Errors
If you get 403 errors:
1. Check user permissions in database
2. Add `manage_payments` permission to your user role
3. Add `manage_payment_plans` permission for admin features

## Verification Checklist

- [ ] Backend server restarted successfully
- [ ] Database migration completed
- [ ] Frontend server restarted
- [ ] Payment Plans page accessible
- [ ] New booking form shows payment options
- [ ] Booking details show payment management
- [ ] Can create payment plans
- [ ] Can add manual payments
- [ ] Payment proofs upload works
- [ ] Payment summary updates correctly

Once all steps are completed, the full payment integration should be visible and functional!
