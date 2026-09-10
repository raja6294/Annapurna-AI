# Quick Start: GPS Testing in Annapurna AI

## Start the Application

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Expected: Server running on port 5000

### Terminal 2: Frontend
```bash
npm run dev
```
Expected: Frontend running on http://localhost:5173

## Desktop Testing (Chrome)

### Step 1: Simulate GPS Location

1. Open http://localhost:5173/ in Chrome
2. Press **F12** to open DevTools
3. Click **⋮** (three dots) → **More tools** → **Sensors**
4. Under **Location**, click the dropdown and select **Add**
5. Enter test location:
   - Latitude: `22.5726`
   - Longitude: `88.3639` (Kolkata, India)
   - Label: "Test Location"
6. Click **Add**
7. Now that location is available for selection

### Step 2: Login and Navigate

1. Login as a Provider
2. Click "Provider Portal"
3. Click "Register Surplus" or go to `/provider/register-surplus`

### Step 3: Test GPS Button

1. Scroll down to **"Exact Location (Tap on map to set)"**
2. You should see:
   - Address input field
   - **"📍 GPS"** button next to it
   - Map below

3. Click the **"📍 GPS"** button
4. **Browser prompt appears:** "Allow this site to access your location?"
5. Click **Allow**

### Step 4: Verify GPS Activation

After clicking Allow, you should see:

✅ Map **flies to** the simulated GPS location
✅ **Blue pulsing dot** marker appears (different from gold marker)
✅ Status message appears:
   ```
   🟢 ✓ Live location enabled
      Accuracy: 8 m
   ```
✅ Address field updates with reverse-geocoded address

### Step 5: Test Manual Selection Still Works

1. Click elsewhere on the map
2. Map should show a **gold marker** at your clicked location
3. Manual selection still works alongside GPS

### Step 6: Submit Food Donation

1. Fill in all food details:
   - Food Name: "Veg Biryani"
   - Category: "Cooked Meals (Vegetarian)"
   - Quantity: 50 kg
   - Storage Condition: "Insulated Thermal Cases"

2. Upload at least one image
3. Click "RUN AI FRESHNESS ASSESSMENT"
4. Click "MAKE FOOD AVAILABLE — TRACK PICKUP"

### Step 7: Verify Backend Stored Coordinates

Open MongoDB (or use a MongoDB client):

```bash
mongosh
use annapurna_ai
db.foodlistings.findOne({}, { foodName: 1, location: 1 })
```

**Expected output:**
```json
{
  _id: ObjectId("..."),
  foodName: "Veg Biryani",
  location: {
    latitude: 22.5726,
    longitude: 88.3639
  }
}
```

✅ Coordinates match the GPS location you simulated!

## Mobile Testing

### iOS (iPad/iPhone)

1. Build app or use localhost
2. Open http://localhost:5173 in Safari
3. Ensure HTTPS in production, HTTP works on localhost
4. Click GPS button
5. Safari asks: "Allow 'Annapurna AI' to access your location while you use the app?"
6. Select "Allow" or "Allow Once"
7. Map updates to device location

### Android (Phone)

1. Ensure device location services are ON
2. Open http://localhost:5173 in Chrome
3. Click GPS button
4. Chrome asks: "Allow Annapurna AI to access your location?"
5. Select "Allow"
6. Map updates to device GPS

## Testing Location Updates (Live Tracking)

### On Desktop:
1. GPS enabled (see blue marker)
2. In DevTools Sensors, change the coordinates
   - Latitude: `22.6000` (move north)
   - Longitude: `88.3800` (move east)
3. **Expected:** Blue marker moves on the map in 5-30 seconds

### On Mobile:
1. GPS enabled
2. Walk around
3. **Expected:** Marker follows your movement

## Verify Accuracy Display

1. GPS location shows different accuracy values
2. Typical accuracy: 8-30 meters
3. Example in UI: "Accuracy: 12 m"
4. Lower is better (more precise location)

## Error Scenarios to Test

### Scenario 1: Permission Denied
1. Click GPS button
2. Click "Block" in browser prompt
3. **Expected error:** "Location permission denied. Please allow location access in your browser settings."

### Scenario 2: Retry After Denied
1. Refresh page
2. Click GPS again
3. This time click "Allow"
4. **Expected:** GPS should work now

### Scenario 3: Move to Another Screen
1. GPS enabled with blue marker
2. Navigate to a different page
3. Return to Register Surplus
4. **Expected:** GPS watcher is cleaned up, status resets

## Advanced Testing: DevTools Location Override

### Simulate Different Cities

#### New Delhi (28.6315, 77.2167)
```
Latitude: 28.6315
Longitude: 77.2167
```

#### Kolkata (22.5726, 88.3639)
```
Latitude: 22.5726
Longitude: 88.3639
```

#### Mumbai (19.0760, 72.8777)
```
Latitude: 19.0760
Longitude: 72.8777
```

#### Bangalore (12.9716, 77.5946)
```
Latitude: 12.9716
Longitude: 77.5946
```

## Complete End-to-End Test

```
1. Start backend & frontend
2. Simulate GPS location in DevTools
3. Login as Provider
4. Go to Register Surplus
5. Upload food image
6. Run AI analysis ✓
7. Click GPS button ✓
8. Allow location ✓
9. Verify map centers on GPS location ✓
10. Verify blue marker appears ✓
11. Verify accuracy displays ✓
12. Fill remaining food details ✓
13. Submit "MAKE FOOD AVAILABLE" ✓
14. Check MongoDB for latitude/longitude ✓
15. Switch to NGO account ✓
16. Go to Food Opportunities ✓
17. Verify distance calculation uses provider's GPS location ✓
```

## Troubleshooting

### GPS Button Not Appearing
- **Solution:** Ensure LocationPickerMap is properly imported in RegisterSurplusPage
- **Check:** `src/pages/provider/RegisterSurplusPage.jsx` line ~8

### Map Not Centering on GPS
- **Solution:** Check DevTools Sensors location is set
- **Check:** Refresh page after setting location
- **Browser console (F12):** Look for errors in Console tab

### Accuracy Not Updating
- **Solution:** Click GPS button multiple times
- **Wait:** GPS updates every 5-30 seconds
- **Try:** Change simulated location in DevTools

### Coordinates Not in MongoDB
- **Solution:** Verify form submission was successful
- **Check:** Browser console for errors
- **Verify:** Food was created (check foodlistings collection)

## Success Indicators

✅ GPS button appears next to location input
✅ Clicking GPS requests browser permission
✅ Permission granted → map centers on GPS location
✅ Blue marker appears at GPS coordinates
✅ Accuracy displayed (e.g., "Accuracy: 8 m")
✅ Changing DevTools location updates marker
✅ Food submitted with GPS coordinates
✅ MongoDB contains latitude/longitude
✅ NGO portal shows food with distance from provider location
✅ Pickup & Delivery page uses provider location

## Files to Check

If things don't work:

1. **`src/components/LocationPickerMap.jsx`**
   - Should have handleUseCurrentLocation function
   - Should have GPS button with Navigation icon
   - Should show blue marker for GPS location

2. **`src/pages/provider/RegisterSurplusPage.jsx`**
   - Should import LocationPickerMap
   - Should send coordinates to backend

3. **`backend/controllers/foodController.js`**
   - Should store location.latitude and location.longitude
   - Should receive from req.body.latitude and req.body.longitude

4. **`backend/models/FoodListing.js`**
   - Should have location schema with latitude/longitude

## Next Steps

After GPS testing:
1. Test with real mobile device
2. Test NGO claiming food (should use provider's GPS location)
3. Test Pickup & Delivery distance calculations
4. Test live location updates during delivery

GPS is now **fully integrated** into Annapurna AI!
