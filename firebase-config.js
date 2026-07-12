// ============================================================
//  firebase-config.js — M/S Dayal Fire Works
// ============================================================
//  HOW TO SET UP FIREBASE (one-time, ~10 minutes):
//
//  1. Go to https://console.firebase.google.com
//  2. Click "Add project" → name it "dayal-fireworks" → Continue
//     (disable Google Analytics if asked) → Create project
//
//  3. Inside the project, click the </> Web icon → register app
//     Name: "DFW Website" → Register app
//     Copy the firebaseConfig values and paste them below.
//
//  4. Enable Google Sign-In:
//     Authentication → Sign-in method → Google → Enable → Save
//     Under "Authorized domains" add your GitHub Pages domain
//     e.g. yourusername.github.io
//
//  5. Create Firestore database:
//     Firestore Database → Create database
//     → Start in "test mode" → choose asia-south1 (Mumbai)
//
//  6. Upload this file (and all others) to GitHub → done!
// ============================================================

export const firebaseConfig = {
  apiKey:            "AIzaSyBTkfVH5TVQpvZ094J1wCWmGESi3iG31y0",
  authDomain:        "dayalfireworks2026.firebaseapp.com",
  projectId:         "dayalfireworks2026",
  storageBucket:     "dayalfireworks2026.firebasestorage.app",
  messagingSenderId: "488801131996",
  appId:             "1:488801131996:web:8651db34dae921e682c319"
};

// ── Only this Google account can access admin.html ──────────
export const ADMIN_EMAIL = "dayalfireworks@gmail.com";

// ── Shop defaults (shown before admin sets real values) ─────
export const SHOP_DEFAULTS = {
  shopName:       "M/S Dayal Fire Works",
  tagline:        "Wholesale Cracker Godown",
  whatsapp:       "919149637898",
  altPhones:      ["9149637898", "9906277804", "8899278436"],
  address:        "Tikri Dayalan Ghou Manhasan, Near Ring Road",
  ownerName:      "Shop Owner",
  ownerEmail:     "",
  googleMapsLink: "",
  logoImage:      null,
};
