# Perfect Fitness Gym — Premium 3D Web Platform

A production-grade, immersive 3D web application built for **Perfect Fitness Gym** using Next.js 14 App Router, TypeScript, React Three Fiber, Three.js, and Tailwind CSS.

Engineered following the **UI/UX Pro Max** design system tokens and **21st.dev** component patterns.

---

## 🚀 Key Features

* **Interactive 3D Hero Scene:** Built with React Three Fiber (`@react-three/fiber`) and Three.js. Features an athletic chrome dumbbell/kettlebell with PBR metallic reflection, rotating energy rings, dynamic point lights, and smooth mouse/touch parallax tracking.
* **21st.dev Bento Grid Amenities:** 5 distinct training zones (Olympic Lifting, Cryo & Thermal Spa, AI Biometrics Lab, Sprint Turf & Combat, and Fuel Bar).
* **Daily Timetable & Class Schedule:** Small-group class schedule with category filters (Strength, HIIT, Boxing, Mobility), calorie burn stats, and instant spot reservations.
* **Dynamic Pricing Matrix:** Interactive monthly vs. annual toggle (20% savings badge) comparing Basic Iron, Elite Pro (Highlighted Choice), and VIP Black tiers.
* **Master Athletic Coaches:** Profiles for Olympic, conditioning, boxing, and physical therapy directors with credential badges.
* **Social Proof & Verified Metrics:** Real member transformations, 4.9/5 star ratings, and facility specs.
* **Interactive Digital Keycard Modal:** Working Day Pass reservation form with input validation and instant QR code keycard generation.
* **Full Accessibility & Responsiveness:** Strict WCAG AAA contrast ratios (14:1+ for headlines, 7:1+ for body copy), 44x44px touch targets, and mobile-friendly drawer menu.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript 5
* **Styling:** Tailwind CSS 3.4
* **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **Icons:** `lucide-react`
* **Deployment Target:** GitHub & Vercel

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Type-checking & Production Build:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 🚢 Deploying to GitHub & Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Perfect Fitness Gym 3D Website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository.
3. Vercel will auto-detect **Next.js** as the framework preset.
4. Click **"Deploy"**. The site will build and deploy with full static prerendering and edge routing.
