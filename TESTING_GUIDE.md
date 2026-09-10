# Annapurna AI - End-to-End Testing Guide

## Prerequisites

1. **MongoDB** must be running on `mongodb://127.0.0.1:27017/annapurna_ai`
2. **Node.js** v18+ installed
3. **Backend Dependencies** installed: `cd backend && npm install`
4. **Frontend Dependencies** installed: `npm install` (from root)

## Setup

### 1. Backend Configuration

Create `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/annapurna_ai
JWT_SECRET=annapurna_dev_secret_change_me
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
USE_MOCK_AI=true
USE_MOCK_MAP=true
MAP_PROVIDER=mock
```

### 2. Frontend Configuration (Optional)

Create `.env.local` in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

If not set, it defaults to `/api` which works with a proxy.

## Starting the Application

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Annapurna AI server running on port 5000 (HTTP + Socket.IO)
```

### Terminal 2: Frontend Dev Server

```bash
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 123 ms
➜  Local:   http://localhost:5173/
```

## End-to-End Test Scenario

### Step 1: Login as Provider

1. Open http://localhost:5173/
2. Navigate to provider login
3. Login with a provider account (create one if needed)
   - Email: `provider@example.com`
   - Password: `password123`

### Step 2: Register Surplus Food

1. Click "Provider Portal"
2. Navigate to "Register Surplus" or use the direct URL: `/provider/register-surplus`
3. Fill in food details:
   - **Food Name**: "Veg Biryani" (or any name)
   - **Category**: "Cooked Meals (Vegetarian)"
   - **Quantity**: 50 kg
   - **Storage Condition**: "Insulated Thermal Containers"
   - **Location**: Pick any location on the map
   - **Temperature**: Adjust slider to simulate thermal storage (50-70°C)
4. **Upload Photos**:
   - Click "Upload Images"
   - Select at least one food image (or use a mock image URL)
   - Wait for upload to complete
5. **Run AI Analysis**:
   - Click "RUN AI FRESHNESS ASSESSMENT"
   - Wait for the AI analysis to complete
   - Should show visual condition, confidence score, and assessment result
6. **Make Available**:
   - Click "MAKE FOOD AVAILABLE — TRACK PICKUP"
   - Wait for success message
   - Should be redirected to "Pickup & Delivery" page

### Step 3: Verify Food Listed as Available

**Expected Result**: 
- Pickup & Delivery page should initially show:
  ```
  No active pickups yet. Register surplus food and wait for an NGO to accept.
  ```
  This is CORRECT - we're waiting for an NGO to claim the food.

### Step 4: Login as NGO

1. Open new browser tab or logout
2. Navigate to http://localhost:5173/
3. Login as an NGO account
   - Email: `ngo@example.com`
   - Password: `password123`

### Step 5: View Food Opportunities

1. Click "NGO Portal"
2. Navigate to "Food Opportunities" or use `/ngo/food-opportunities`
3. **Expected Result**: 
   - Should see the food registered in Step 2
   - Card should show:
     - Food name: "Veg Biryani"
     - Provider name
     - Quantity: 50 kg
     - Distance: calculated distance
     - Match score: 80%+
     - "CLAIM FOOD" button should be available

### Step 6: Claim Food

1. Click "CLAIM FOOD" button
2. Wait for success message
3. Should be redirected to "Incoming" or confirmation page
4. **Backend Action**: 
   - FoodOffer is created
   - FoodListing status changes from AVAILABLE → ACCEPTED
   - Pickup record is created with status NGO_ON_THE_WAY
   - Distribution record is created
   - Notification sent to provider

### Step 7: Return to Provider Portal

1. Switch back to provider browser tab/login
2. Navigate to "Pickup & Delivery" page
3. **Expected Result**:
   - Page should now show:
     ```
     1 Active Pickup
     ```
   - Should display:
     - NGO ACCEPTED YOUR FOOD
     - NGO name: (the NGO that claimed)
     - Food: Veg Biryani
     - Quantity: 50 kg
     - Distance: calculated distance to NGO location
     - ETA: travel time in minutes
     - Route information
     - Pickup status stepper showing:
       1. NGO Accepted ✓ (current)
       2. NGO On The Way
       3. NGO Arrived
       4. Handover
       5. Pickup Completed

### Step 8: Advance Pickup Status

1. Wait or click to advance through the pickup status steps:
   - Step 1: NGO En Route (automatic wait)
   - Step 2: Click "CONFIRM NGO ARRIVED"
   - Step 3: Click "CONFIRM HANDOVER COMPLETE"
   - Step 4: Click "MARK PICKUP COMPLETED"

2. **Final Result**:
   - Page shows "Pickup Completed!" message
   - Success message confirms 200 beneficiaries will be served
   - Button to "Register New Surplus" appears

## Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads without console errors
- [ ] Provider can register food with images
- [ ] AI analysis completes and shows results
- [ ] "Make Available" button works without errors
- [ ] Provider's Pickup & Delivery page initially shows "No active pickups"
- [ ] NGO can see newly created food in Food Opportunities
- [ ] Food card displays real data (not mock data)
- [ ] NGO can click "Claim Food" without errors
- [ ] Provider's Pickup & Delivery updates after NGO claims
- [ ] Pickup shows correct NGO name and food details
- [ ] Pickup status stepper progresses through all steps
- [ ] Final "Pickup Completed" message displays correctly

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
```
Solution: Ensure MongoDB is running on localhost:27017
         Or update MONGODB_URI in .env
```

**Error: Port 5000 already in use**
```
Solution: Change PORT in .env or kill existing process
         lsof -ti:5000 | xargs kill -9
```

### Frontend Issues

**Error: Cannot connect to backend API**
```
Solution 1: Ensure VITE_API_URL is set correctly
Solution 2: Check if backend is running on port 5000
Solution 3: Check browser console for CORS errors
```

**Error: API calls return 401/403**
```
Solution: Ensure you're logged in with a valid user
         Check that JWT token is stored in localStorage
         Try logging out and logging back in
```

### Database Issues

**Food not appearing in NGO opportunities**
```
Possible causes:
1. Food status not set to AVAILABLE (check MongoDB)
2. AI assessment not created (verify FoodAssessment record exists)
3. Food has expired (check expiresAt timestamp)
Solution: Check MongoDB directly to verify food status
```

**Pickup not appearing in provider deliveries**
```
Possible causes:
1. NGO not verified (NGOs must have verificationStatus: VERIFIED)
2. Pickup creation failed silently (check backend logs)
Solution: Verify NGO is VERIFIED in database
         Check backend console for errors
```

## Database Inspection

Open MongoDB:
```bash
mongosh
use annapurna_ai
```

### Check Food Listings
```
db.foodlistings.find({ currentStatus: "AVAILABLE" })
```

### Check Offers
```
db.foodoffers.find({})
```

### Check Pickups
```
db.pickups.find({})
```

## Manual Testing with cURL

### Create Food
```bash
curl -X POST http://localhost:5000/api/foods \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "foodName": "Veg Biryani",
    "category": "Cooked Meals (Vegetarian)",
    "foodType": "VEGETARIAN",
    "quantityKg": 50,
    "numberOfPortions": 100,
    "storageMethod": "Thermal Container"
  }'
```

### Make Available
```bash
curl -X PATCH http://localhost:5000/api/foods/FOOD_ID/available \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get NGO Opportunities
```bash
curl -X GET http://localhost:5000/api/ngo/food-opportunities \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Accept Offer (Claim Food)
```bash
curl -X POST http://localhost:5000/api/offers/FOOD_ID/accept \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantityAccepted": 100}'
```

## Next Steps

After successful end-to-end testing:

1. **Add Real-Time Updates**: Implement Socket.IO listeners for auto-refresh
2. **Add Notifications**: Email/SMS notifications for status changes
3. **Add Reporting**: Analytics and impact dashboard
4. **Add Admin Panel**: Moderation and verification tools
5. **Performance Testing**: Load test with multiple concurrent users
6. **Security Audit**: Review authentication and authorization

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs: `npm run dev` output
3. Check browser console (F12 → Console)
4. Check MongoDB directly for data verification
5. Create an issue with detailed error messages and logs
