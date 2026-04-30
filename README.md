# AgriAce Admin Panel

A standalone Next.js admin panel for managing AgriAce fertilizers business.

## Features

### Dashboard
- Real-time statistics overview
- Product counts and status
- Lead tracking
- User management metrics
- Newsletter subscriber counts
- Quick action shortcuts

### Product Management
- **List Products**: View all products with search and filters
- **Add Product**: Create new fertilizer products
- **Edit Product**: Update product details
- **Delete Product**: Remove products from inventory
- Product fields:
  - Name, Slug, SKU
  - Category assignment
  - Short & full descriptions
  - Pricing (PKR)
  - Status (Draft/Published/Archived)
  - Featured flag

### Navigation
- Dashboard
- Products
- Categories
- Leads
- Users
- Testimonials
- Newsletter
- Settings

## Tech Stack

- **Framework**: Next.js 16.2.4
- **Database**: PostgreSQL (shared with main agriace project)
- **ORM**: Prisma 7.8.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database running (shared with main agriace app)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agriace_fertilizers"
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Start development server:
```bash
npm run dev
```

The admin panel will be available at: http://localhost:3001

## Login Credentials (Demo)

- **Email**: admin@agriace.com
- **Password**: admin123

> Note: This is a demo authentication. For production, implement NextAuth.js or similar.

## Database

The admin panel connects to the same PostgreSQL database as the main agriace application:
- Database: `agriace_fertilizers`
- All schema changes are managed through Prisma

## Project Structure

```
adminagriace/
├── app/
│   ├── login/              # Login page
│   ├── products/           # Product CRUD
│   │   ├── new/           # Add product
│   │   ├── [id]/edit/     # Edit product
│   │   ├── page.tsx       # List products
│   │   ├── actions.ts     # Server actions
│   │   └── ProductForm.tsx
│   ├── page.tsx           # Dashboard
│   └── layout.tsx         # Root layout
├── components/
│   ├── AdminLayout.tsx    # Main admin layout
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── Header.tsx         # Top header
├── lib/
│   └── prisma.ts          # Prisma client
└── prisma/
    └── schema.prisma      # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma client

## Features to Add (Future)

- [ ] User authentication with NextAuth.js
- [ ] Category management CRUD
- [ ] Lead management interface
- [ ] User role management
- [ ] Testimonials management
- [ ] Newsletter management
- [ ] File upload for product images
- [ ] Bulk product import/export
- [ ] Analytics and reports
- [ ] Activity logs

## Security Notes

- Current authentication is for demo purposes only
- Implement proper authentication before production
- Add middleware to protect routes
- Use environment variables for sensitive data
- Implement RBAC (Role-Based Access Control)

## Support

For issues or questions, contact: support@agriace.com
