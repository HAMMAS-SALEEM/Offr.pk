# Offr-PK

Offr-PK is a **Next.js 15** application built with the **App Router**, **TypeScript**, **Prisma**, and **PostgreSQL**.
It allows shopkeepers to post local offers and customers to explore them.

---

## 🚀 Features

- **Shopkeeper Dashboard** — Manage shop profile and post offers.
- **Public Pages** — Customers can view and search offers.
- **Authentication** — Sign up and sign in with secure password hashing.
- **Prisma ORM** — Type-safe database queries with PostgreSQL.
- **Responsive UI** — TailwindCSS-powered, mobile-friendly.
- **API Routes** — Built-in Next.js API handlers for offers, shops, and authentication.

---

## 📂 Folder Structure

```plaintext
offr-pk/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Homepage with offers list
│   │   └── offers/
│   │       └── [id]/page.tsx          # Single offer detail
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx             # Login form page
│   │   └── signup/page.tsx            # Registration form page
│   │
│   ├── (dashboard)/
│   │   ├── page.tsx                   # Shopkeeper dashboard home
│   │   ├── profile/page.tsx           # Shop profile page
│   │   └── post-offer/page.tsx        # Create new offer page
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts         # Login API
│   │   │   └── signup/route.ts        # Signup API
│   │   ├── offers/
│   │   │   ├── route.ts               # GET + POST offers
│   │   │   └── [id]/route.ts          # GET single offer
│   │   └── shops/route.ts             # Create/update shop profile
│   │
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles (Tailwind)
│
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx        # Layout for dashboard pages
│   │   └── PublicLayout.tsx           # Layout for public pages
│   ├── offers/
│   │   ├── OfferCard.tsx              # Offer card UI
│   │   └── OfferForm.tsx              # Offer form UI
│   ├── shops/
│   │   └── ShopProfileForm.tsx        # Shop profile form
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Loader.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── prisma.ts                      # Prisma client setup
│   ├── auth.ts                        # Authentication helpers
│   └── validators.ts                  # Validation schemas
│
├── prisma/
│   └── schema.prisma                   # Database schema
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── placeholder.jpg
│
├── types/
│   ├── offer.ts                        # Offer type definitions
│   └── shop.ts                         # Shop type definitions
│
├── .env                                # Environment variables
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Custom email/password with bcrypt
- **Deployment**: Vercel (frontend + backend in one)

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/offr-pk.git

# Navigate to the project
cd offr-pk

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run Prisma migrations
npx prisma migrate dev

# Start development server
npm run dev
```

---

## 📜 Environment Variables

| Variable          | Description                       |
|-------------------|-----------------------------------|
| DATABASE_URL      | PostgreSQL connection string      |
| NEXTAUTH_SECRET   | Secret for authentication hashing |

---

## 📌 Deployment

This app can be deployed **entirely on Vercel** since Next.js API routes work as backend functions.

1. Push your code to GitHub.
2. Import the repo into Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy! 🚀

---

## 📄 License

[MIT License](./LICENSE) © 2025 Offr.pk